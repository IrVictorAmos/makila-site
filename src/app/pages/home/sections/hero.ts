import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../shared/icon';
import { Phone } from '../../../shared/phone';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Icon, Phone],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
