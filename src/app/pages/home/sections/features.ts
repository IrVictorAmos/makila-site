import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../../shared/icon';
import { IconName } from '../../../shared/icons';
import { Reveal } from '../../../shared/reveal';
import { ScreenCrop } from '../../../shared/screen-crop';

@Component({
  selector: 'app-features',
  imports: [Icon, Reveal, ScreenCrop],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  protected readonly small: { icon: IconName; title: string; text: string }[] = [
    {
      icon: 'volume-2',
      title: "Test d'éligibilité lu à voix haute",
      text: 'Des questions illustrées, lues à voix haute, pour celles et ceux qui lisent difficilement.',
    },
    {
      icon: 'calendar-check',
      title: 'Collectes et rappels',
      text: "Inscription en un geste, rappel la veille et deux heures avant, ajout à l'agenda du téléphone.",
    },
    {
      icon: 'megaphone',
      title: 'Alertes santé de votre ville',
      text: "Épidémies, vaccinations : symptômes, prévention et que faire, publiés par des établissements vérifiés.",
    },
  ];
  protected readonly wide: { icon: IconName; title: string; text: string }[] = [
    {
      icon: 'package',
      title: 'Stock de sang en temps réel',
      text: 'Chaque établissement tient son stock par groupe et par produit, même hors connexion. Les manques se voient avant de devenir des urgences.',
    },
    {
      icon: 'pill',
      title: 'Pharmacies de garde et urgences',
      text: 'Qui est de garde ce soir, et quel numéro appeler, ville par ville.',
    },
  ];
  protected readonly extras: { icon: IconName; label: string }[] = [
    { icon: 'wifi-off', label: 'Fonctionne hors connexion' },
    { icon: 'languages', label: 'Français et kiswahili' },
    { icon: 'award', label: '9 badges et votre impact' },
    { icon: 'map', label: 'Carte des établissements' },
    { icon: 'route', label: 'Itinéraire vers l\'hôpital' },
  ];
}
