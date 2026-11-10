import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../shared/icon';
import { IconName } from '../../../shared/icons';
import { Phone } from '../../../shared/phone';
import { Reveal } from '../../../shared/reveal';

@Component({
  selector: 'app-orgs',
  imports: [RouterLink, Icon, Phone, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orgs.html',
  styleUrl: './orgs.scss',
})
export class Orgs {
  protected readonly tools: { icon: IconName; title: string; text: string }[] = [
    { icon: 'siren', title: 'Publier un besoin en 30 secondes', text: 'Groupe, produit, poches, urgence, zone. La portée estimée s\'affiche avant l\'envoi.' },
    { icon: 'users', title: 'Voir qui arrive', text: 'Donneurs engagés, heure d\'arrivée, confirmation du don par scan du QR code.' },
    { icon: 'package', title: 'Tenir le stock', text: 'Par groupe et par produit, saisissable hors connexion, visible par ville.' },
    { icon: 'calendar-plus', title: 'Organiser des collectes', text: 'Inscriptions, rappels automatiques, groupage sur place pour ceux qui ignorent leur groupe.' },
    { icon: 'megaphone', title: 'Informer la population', text: 'Annonces santé avec photos et vidéo, alertes épidémie, signalement privé de cas.' },
    { icon: 'user-round-check', title: 'Gérer l\'équipe', text: 'Administrateurs, personnel médical et agents, chacun avec ses droits.' },
  ];
  protected readonly join = [
    'Téléchargez Makila et créez votre compte personnel.',
    'Dans « Moi », choisissez « Inscrire mon établissement » : type, adresse, horaires, numéro d\'agrément.',
    'Joignez vos pièces justificatives (agrément, autorisation d\'ouverture).',
    'L\'équipe Makila vérifie le dossier. Votre établissement reçoit le badge « vérifié ».',
  ];
}
