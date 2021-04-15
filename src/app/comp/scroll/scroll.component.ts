import { ActivatedRoute,Router } from '@angular/router';
// import { FragmentService } from './../../service/fragment.service';
import { Component, OnInit , ChangeDetectionStrategy,ChangeDetectorRef,
  ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY,VirtualScrollStrategy,
  
  ScrollDispatcher, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {  Input, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Location, LocationStrategy, PathLocationStrategy, PlatformLocation,
 } from '@angular/common';


export interface HashExist {
  hashVisible?: boolean;
  hashName?: string;
}



@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [{provide: VIRTUAL_SCROLL_STRATEGY,useClass:ScrollDispatcher},Location,
     {provide: LocationStrategy, useClass: PathLocationStrategy}],
     
   
// providers: [Location, {provide: LocationStrategy, useClass: ScrollComponent}],
})
export class ScrollComponent implements OnInit , AfterViewInit{
  // items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  items = Array.from({length: 11}).map((_, i) => `Item #${i}`);
  //  Position:String = 'start'|'mid'| 'end'
  start=0;
  scrollToPage = ['aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','iii','jjj','kkk'] ;
  activeScrollIndex:Observable<number>;
  activatedRouteFragment = this.activatedRoute.fragment;
  activeFragmentSnapShot;
  windowLocation;
  indexFocus;
  activeFragment$: BehaviorSubject<string> = new BehaviorSubject(window.location.hash.valueOf());
  spyHash: HashExist= { hashVisible: false};   
  spyHashCurrent: HashExist;
  currentElement: string; 

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport; 
  //  @HostListener('window:scroll',['$event']) onScrollEvent($event){
  //   window.onhashchange (locationHashChanged)
  //  }

  constructor(
    // private fragmentService:FragmentService,
    private renderer: Renderer2, 
    @Inject(PLATFORM_ID) private platformId: Object,
    public activatedRoute:ActivatedRoute ,
    private router:Router,
    private ref: ChangeDetectorRef,
    private scrollDispatcher:ScrollDispatcher,
    private platformLocation : PlatformLocation,
    private location :Location) { 
      // this.activatedRoute.fragment.subscribe(
      //   (frag)=>{
      //     console.log(frag);
      //     this.activeFragment = frag;
      //   }
      // );
      // this.ref.detectChanges();
      // this.activatedRoute.snapshot.fragment.valueOf();
      // this.location.
      // this.platformLocation.onHashChange(this.locationChangeListener)
        // console.log(hash); 
      
    }

  ngOnInit(): void {


  }

  ngAfterViewInit(){
    this.activeScrollIndex = this.viewPort.scrolledIndexChange;
    this.viewPort.scrolledIndexChange.subscribe((index)=>
    {console.log(index);
      console.log(this.viewPort.getViewportSize());
      console.log(this.viewPort.getElementRef())
      this.indexFocus = index;

      this.router.navigate(['./scroll'],{fragment:this.scrollToPage[index]});
    
          
        });
       
    // this.ref.detectChanges();
    this.scrollDispatcher.scrolled()
    .subscribe(event => {
      console.log('scrolled........');
       console.log(this.getCurrentHash())
      console.log(this.getCurrentHash())
    });
    // this.scrollDispatcher.ancestorScrolled().subscribe()
   
  }
// *******************



  // @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport; 
  // @HostListener('window:scroll',['$event']) onScrollEvent($event){
  //   window.onhashchange = this.locationHashChanged;
  // }
  locationHashChanged(){

    // this.activatedRoute.fragment.subscribe(
    //   (frag)=>{
    //     console.log(frag);
    //     this.activeFragment = frag;
    //     const fragmentElement = document.querySelector('#'+frag);
    //     if ( fragmentElement ){
          
    //         setTimeout(() => {
    //         fragmentElement.scrollIntoView({behavior: 'smooth', block: 'start', 
    //         inline: 'nearest'});
    //         this.scroll(this.scrollToPage.indexOf(frag));
    //         }, 0);
    //     }

    //   }
    // );
    // this.scroll(this.scrollToPage.indexOf(location.hash));
    // console.log(this.scrollToPage.indexOf(location.hash));
 
  }
  
  funcOnHashChange(){
    console.log('###### changing the hash ##########');
    // this.router.isActive 
    // ( url: string | UrlTree, exact: boolean): boolean
    // this.activatedRoute.snapshot.fragment;
  }
   updateVerticalScroll(event): void {
  }
  // fishing for the active fragment with bellow function has been tried unsuccesfully
 getCurrentHash() {
    return decodeURIComponent(this.platformLocation.hash.replace(/^#\/scroll#/, ''));
    // this.platformLocation.onHashChange(hash=>{
    //   console.log(hash);
    // })
  }

 locationChangeListener(){
   console.log(this.activatedRoute.fragment)
 }

//  syncWindowToCdk(eventHash:HashExist) ******* has two versions that behave and work differently.
//   Please comment/uncomment both alternatively  to observe functionality;
 syncWindowToCdk(eventHash:HashExist)
  {  

    this.renderer.listen(window, 'scroll', (event) => {
      
      if (eventHash.hashVisible == true){
        this.activeFragment$.next(eventHash.hashName);
            // comment or uncomment the next line to observe the changes***************
            // this.router.navigate(['./scroll'],{fragment:eventHash.hashName });
        
             this.scroll(this.scrollToPage.indexOf(eventHash.hashName));

    }
  });
}
 
 


// syncWindowToCdk(eventHash:HashExist)
//   {   console.log(eventHash);
    
//    if (eventHash.hashVisible == true){
//      this.scroll(this.scrollToPage.indexOf(eventHash.hashName));
//      this.router.navigate(['./scroll'],{fragment: eventHash.hashName});
//    }
//  }
  scroll(position) {
   
    // this.viewPort.scrollToIndex(position, 'auto');
    this.viewPort.scrollToIndex(position,'smooth');
  }



}









