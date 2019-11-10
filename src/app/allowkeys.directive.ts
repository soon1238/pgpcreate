import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[Allowkeys]'
})

export class AllowkeysDirective {
  // allowregex='.*?';
  // this json is the negative of what is allowed
  AllowRegEx = {
    Custom: '.', // do not allow paste if allow then need to get all the non allow keys value
    Custom_bracket: '.',
    Numbers_letters: '[^a-zA-Z0-9]',
    Numbers_comma:'[^0-9,]',
    Number_plus_minus:'[^0-9+-]',
    Numbers:'[^0-9]',
    Decimal:'[^0-9.]',
    Decimal_plus_minus:'[^0-9.+-]',
    Dates:'[^0-9./-]',
    Prevent_enter:''
  }
  re: any;
  @Input() Allowkeys: string;

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    // console.log("keycode: ", e);
    switch (this.Allowkeys) {
      // front-end santized code 
      case "Custom":
        //space, delete, backspace,tab,escape,enter,decimal point,plus,subtract,multiply,(dash,underscore)
        if ([32, 46, 8, 9, 27, 13, 110, 107, 109, 106, 189].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+C
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+V
          // (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          // Allow : + ? , .but not ; = / < >
          ([186, 187, 191, 188, 190].indexOf(e.keyCode) !== -1 && !(e.shiftKey)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 40)) {
          // let it happen, don't do anything
          return;

        }
        // Ensure that it valid chars and stop the keypress
        // if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        // allows numbers,letters, NO ( ambersand, brackets, percentage , asterisk) & disable ctrl v
        if (!((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) || ([55, 48, 57, 53, 56].indexOf(e.keyCode) !== -1 && e.shiftKey) || ([86].indexOf(e.keyCode) !== -1 && e.ctrlKey)) {
          e.preventDefault();
        }
        break;
      // }
      //customed and Brackets
      case 'Custom_brackets':
        //space, delete, backspace,tab,escape,enter,decimal point,+,*,dash
        if ([32, 46, 8, 9, 27, 13, 110, 107, 109, 106, 189].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+C
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+V
          // (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          // Allow : + ? but not ; = / 
          ([186, 187, 191].indexOf(e.keyCode) !== -1 && (e.shiftKey)) ||
          // Allow , . but not < >
          ([188, 190].indexOf(e.keyCode) !== -1 && !(e.shiftKey)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 40)) {
          // let it happen, don't do anything
          return;

        }
        // Ensure that it valid chars and stop the keypress
        //disable percentage & * ctrl-v
        // if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        if (!((e.keyCode >= 48 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105)) || ([53, 56].indexOf(e.keyCode) !== -1 && e.shiftKey) || ([86].indexOf(e.keyCode) !== -1 && e.ctrlKey)) {
          e.preventDefault();
        }
        break;

      //digits and letters
      case 'Numbers_letters':
        // Allow delete, backspace,tab,enter
        if ([46, 8, 9, 13].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+C
          // (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // // Allow: Ctrl+V
          (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 40)) {
          // let it happen, don't do anything 
          return;
        }
        // Ensure that it is a number and letters and stop the keypress
        if (!((e.keyCode >= 65 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57) && !(e.shiftKey))) {
          // if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
        // }
        break;

      // digits and comma
      case 'Numbers_comma':
        // Allow delete, backspace,escape,enter
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+C
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+V
          (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          //Allow comma only
          ([188].indexOf(e.keyCode) !== -1 && !(e.shiftKey)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
        // }
        break;

      // digits and + -
      case 'Number_plus_minus':
        // Allow delete, backspace,escape,enter,add,subtract
        if ([46, 8, 9, 27, 13, 107, 109].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+C
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+V
          (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          // Allow +
          ([187].indexOf(e.keyCode) !== -1 && (e.shiftKey)) ||
          // Allow -
          ([187].indexOf(e.keyCode) !== -1 && !(e.shiftKey)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
        break;
      case 'Numbers':
        //removing 190,110
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+C
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+V
          (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
        break;
      case 'Decimal':
        if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+C
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+V
          (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          // Allow . 
          ([190].indexOf(e.keyCode) !== -1 && !(e.shiftKey)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
        break;
      case 'Decimal_plus_minus':
        if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+C
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+V
          (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          // Allow +
          ([187].indexOf(e.keyCode) !== -1 && (e.shiftKey)) ||
          // Allow . minus
          ([190, 189].indexOf(e.keyCode) !== -1 && !(e.shiftKey)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
        break;
        case 'Dates':
        // Allow delete, backspace,escape,enter,dash, subtract
        if ([46, 8, 9, 27, 13, 189, 109].indexOf(e.keyCode) !== -1 ||
          // Allow :dot & forward slash, 
          ([190, 191].indexOf(e.keyCode) !== -1 && (!e.shiftKey)) ||
          // Allow: Ctrl+A
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+C
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+V
          (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          // Allow: Ctrl+X
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
        break;
        case 'Prevent_enter':
            if (e.keyCode===13) {
              console.log ("enter key detected");
              e.preventDefault();
            }
            break;
      default:
        // allow all chars
        break;
   

    }
  }

  //Paste event
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const re = new RegExp(this.AllowRegEx[this.Allowkeys], 'g'); 
    const pastedInput: string = event.clipboardData
      .getData('text/plain')
      .replace(re, ''); // get a digit-only string which we can create our own regex

    document.execCommand('insertText', false, pastedInput);
  }
}
