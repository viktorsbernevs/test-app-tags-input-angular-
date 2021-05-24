import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-tagsinput',
  templateUrl: './tagsinput.component.html',
  styleUrls: ['./tagsinput.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsinputComponent implements OnInit {
  @Output() changed = new EventEmitter<any>();
  tags: string[] = ['tag1', 'tag2', 'rofl'];
  
  myFormControl: FormControl;
  
  constructor() { 
    this.myFormControl = new FormControl();
    this.myFormControl.setValue('');
    
    this.myFormControl.valueChanges.subscribe((tags) => {
      this.changed.emit(tags);
      console.log('tags array value update received');
    });
  }

  ngOnInit(): void {
  }

  
  onKeyUp(event:KeyboardEvent): void {
    const inputValue: string = this.myFormControl.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Enter') {
        this.addTag(inputValue);
        this.myFormControl.setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1 ] === ',' || tag[tag.length - 1] === ' '){
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !this.tags.includes(tag)){
      this.changed.emit(this.tags.push(tag));
    }

  }

  removeTag(tag?: string): void {
    if (!!tag ) {
      this.changed.emit(this.tags.splice(this.tags.indexOf(tag), 1));
    }else{
      this.changed.emit(this.tags.splice(-1));
    }
  }
}
