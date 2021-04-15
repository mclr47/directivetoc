import {HashExist } from './../comp/scroll/scroll.component';
import { Router } from '@angular/router';
import { Directive ,ElementRef, 
  HostListener,Input,Output,AfterViewInit,ViewChild,
  EventEmitter } from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Directive({
  selector: '[appHashSpy]'
})
export class HashSpyDirective implements AfterViewInit {


  // hashOnFocusScrollObject:OnFocus ;
  hashOnFocusScrollObject:HashExist ;
  hashOnFocusScroll;
  scrollToPage = ['aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','iii','jjj','kkk'] ;
  // The input  <<<elem id>>> can be taken out since can be identified as (this.el.nativeElement as HTMLElement).id 
  @Input() hashInput: string; 

  @Output() inFocusViewEventEmitter = new EventEmitter(); 
  constructor(private el:ElementRef, private router:Router) {
    this.hashOnFocusScrollObject = {hashVisible: false,
      hashName: ''}
   }


  @HostListener('window:scroll', ['$event']) onScrollEvent($event)
 {

this.hashOnFocusScrollObject.hashVisible= false;
       const spiedHash =  (this.el.nativeElement as HTMLElement).id
       this.hashOnFocusScrollObject.hashName = (this.el.nativeElement as HTMLElement).id ;
      
     if (this.isVisible( this.el.nativeElement as HTMLElement)){
   
      //  console.log(spiedHash+'.........>>>>is visible')
         this.hashOnFocusScroll = true;
         this.hashOnFocusScrollObject.hashVisible = true ;
        
        this.el.nativeElement.style.backgroundColor = 'yellow';

    }
    else {
      this.hashOnFocusScroll = false;
      this.hashOnFocusScrollObject.hashVisible = false;
       this.el.nativeElement.style.backgroundColor = 'white';
      // console.log(spiedHash+'.........>>>>is  NOT visible')
     }
  this.inFocusViewEventEmitter.emit(this.hashOnFocusScrollObject);
 
 } 
//  *************************
  ngAfterViewInit(){
    // ****** Failed attempt to manipulate <<cdk-virtual-scroll-viewport>> from the directive

    // this.viewPort.scrolledIndexChange.subscribe((index)=>
    // {console.log(index);
    //   console.log(this.viewPort.getViewportSize());
    //   console.log(this.viewPort.getElementRef())
    //   // this.indexFocus = index;

    //   this.router.navigate(['./scroll'],{fragment:this.scrollToPage[index]});
    
          
    //     });


  }
  // ****************************

 isVisible(elem: HTMLElement ) {

    if (!(elem instanceof Element)) {
      throw Error('DomUtil: elem is not an element.');
    }

    const style = getComputedStyle(elem);

    if (style.display === 'none') {
      
       return false;
      
    }

    if (style.visibility !== 'visible') {
   
      return false;
    }

    if (+style.opacity < 0.1) {
     
      return false;
    }

    if (
      elem.offsetWidth +
        elem.offsetHeight +
        elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width ===
      0
    ) {
      // this.spyHash.hashVisible = false;
       return false;
    }

    const elemCenter = {
      x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
      y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
    };

    if (elemCenter.x < 0) {
       return false;
   
    }

    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) {
       return false;
  
    }

    if (elemCenter.y < 0) {
       return false;
     
    }

    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) {
      return false;
  
    }

    let pointContainer: any = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
      if (pointContainer === elem) {
        console.log(elem.id);
     
        return true;
        
      }
      
    } 
     while ((pointContainer = pointContainer.parentNode));

     return false;
   
  }
}

