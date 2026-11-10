import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../../shared/icon';
import { Reveal } from '../../../shared/reveal';

@Component({
  selector: 'app-steps',
  imports: [Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './steps.html',
  styleUrl: './steps.scss',
})
export class Steps {}
