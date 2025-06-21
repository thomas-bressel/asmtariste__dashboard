import { Component } from '@angular/core';
import { Button } from '../ui/button/button';

@Component({
  selector: 'header[app-header]',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
