import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // Properties
  @HostBinding('class.open') isOpen = false;

  constructor() { }

  // Methods
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
