import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../shared/icon';
import { IconName } from '../../../shared/icons';
import { Reveal } from '../../../shared/reveal';

@Component({
  selector: 'app-trust',
  imports: [RouterLink, Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trust.html',
  styleUrl: './trust.scss',
})
export class Trust {
  protected readonly items: { icon: IconName; title: string; text: string }[] = [
    { icon: 'file-check', title: 'Établissements vérifiés sur dossier', text: "Agrément et pièces justificatives sont examinés avant qu'un établissement puisse publier une demande. Le badge « vérifié » est visible par tous." },
    { icon: 'lock', title: 'Groupe sanguin protégé', text: 'Une fois renseignés, le groupe, le sexe et la date de naissance ne changent que par une demande justifiée, vérifiée par l\'équipe. Un établissement peut certifier votre groupe.' },
    { icon: 'eye-off', title: 'Position jamais enregistrée', text: 'Le GPS sert uniquement à vérifier, au moment de répondre, que vous êtes bien dans la ville de l\'hôpital.' },
    { icon: 'message-circle-warning', title: 'Commentaires modérés', text: 'Filtre automatique, signalements et blocage temporaire des auteurs de propos abusifs.' },
    { icon: 'shield-check', title: 'Signalement privé de cas', text: 'Vous connaissez un cas suspect ? Prévenez l\'établissement directement, sans exposer personne publiquement.' },
    { icon: 'trash-2', title: 'Vos données vous appartiennent', text: 'Vous pouvez supprimer votre compte à tout moment, depuis l\'application.' },
  ];
}
