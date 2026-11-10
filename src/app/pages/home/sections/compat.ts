import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Reveal } from '../../../shared/reveal';

type Group = 'O-' | 'O+' | 'A-' | 'A+' | 'B-' | 'B+' | 'AB-' | 'AB+';
const GROUPS: Group[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

/** Compatibilité des globules rouges (système ABO et rhésus). */
function canGive(donor: Group, recipient: Group): boolean {
  const abo = (g: Group) => g.replace(/[+-]/, '');
  const d = abo(donor);
  const r = abo(recipient);
  const aboOk = d === 'O' || d === r || r === 'AB';
  const rhOk = donor.endsWith('-') || recipient.endsWith('+');
  return aboOk && rhOk;
}

@Component({
  selector: 'app-compat',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './compat.html',
  styleUrl: './compat.scss',
})
export class Compat {
  protected readonly groups = GROUPS;
  protected readonly selected = signal<Group>('O+');
  protected readonly giveTo = computed(() => GROUPS.filter((g) => canGive(this.selected(), g)));
  protected readonly receiveFrom = computed(() => GROUPS.filter((g) => canGive(g, this.selected())));
  protected readonly note = computed(() => {
    switch (this.selected()) {
      case 'O-': return 'Donneur universel : vos globules rouges conviennent à tout le monde. Votre groupe est très recherché en urgence.';
      case 'O+': return 'Le groupe le plus répandu : vos dons servent à beaucoup de patients.';
      case 'AB+': return 'Receveur universel : vous pouvez recevoir des globules rouges de tous les groupes.';
      case 'AB-': return 'Groupe rare : chaque donneur compte.';
      default: return this.selected().endsWith('-')
        ? 'Rhésus négatif : vous pouvez aussi aider les personnes de même groupe au rhésus positif.'
        : 'Vos dons aident les personnes de votre groupe et du groupe AB.';
    }
  });

  protected has(list: Group[], g: Group): boolean {
    return list.includes(g);
  }

  protected onKey(e: KeyboardEvent, i: number): void {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + GROUPS.length) % GROUPS.length;
    this.selected.set(GROUPS[next]);
    const el = (e.currentTarget as HTMLElement).parentElement?.children[next] as HTMLElement | undefined;
    el?.focus();
  }
}
