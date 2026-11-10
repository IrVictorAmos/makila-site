import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QR_PATH, QR_SIZE } from '../../../data/qr';
import { Icon } from '../../../shared/icon';
import { Logo } from '../../../shared/logo';
import { Reveal } from '../../../shared/reveal';
import { SITE } from '../../../site.config';

@Component({
  selector: 'app-download',
  imports: [Icon, Logo, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './download.html',
  styleUrl: './download.scss',
})
export class Download {
  protected readonly href = SITE.downloadPath;
  protected readonly playStore = SITE.playStoreUrl;
  protected readonly qrPath = QR_PATH;
  protected readonly qrBox = `-2 -2 ${QR_SIZE + 4} ${QR_SIZE + 4}`;
}
