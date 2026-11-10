import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../shared/icon';
import { Reveal } from '../../../shared/reveal';

interface Question {
  q: string;
  hint?: string;
  /** Réponse qui permet de continuer. */
  ok: boolean;
  /** Explication si la réponse empêche le don aujourd'hui. */
  why: string;
}

/** Mêmes critères que le test de l'application (le personnel médical décide sur place). */
const QUESTIONS: Question[] = [
  { q: 'Avez-vous entre 18 et 65 ans ?', ok: true, why: "Le don est ouvert de 18 à 65 ans. En attendant, vous pouvez déjà encourager vos proches à donner." },
  { q: 'Pesez-vous au moins 50 kg ?', ok: true, why: 'Un poids minimum de 50 kg protège votre santé pendant le don.' },
  { q: "Vous sentez-vous en bonne santé aujourd'hui ?", ok: true, why: 'Revenez quand vous vous sentirez bien : votre santé passe en premier.' },
  { q: 'Avez-vous eu de la fièvre, le paludisme ou une infection ces deux dernières semaines ?', ok: false, why: 'Attendez deux semaines après la guérison avant de donner.' },
  { q: 'Êtes-vous enceinte, ou avez-vous accouché ou allaité ces six derniers mois ?', hint: 'Pour les hommes, répondez « Non ».', ok: false, why: "Le don redevient possible six mois après l'accouchement ou la fin de l'allaitement." },
  { q: "Avez-vous fait un tatouage, un piercing ou de l'acupuncture ces quatre derniers mois ?", ok: false, why: 'Attendez quatre mois après un tatouage, un piercing ou une séance d\'acupuncture.' },
  { q: 'Avez-vous donné votre sang récemment ?', hint: 'Moins de 3 mois pour un homme, moins de 4 mois pour une femme.', ok: false, why: 'Votre corps a besoin de 3 mois (hommes) ou 4 mois (femmes) entre deux dons de sang total.' },
];

@Component({
  selector: 'app-eligibility',
  imports: [RouterLink, Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './eligibility.html',
  styleUrl: './eligibility.scss',
})
export class Eligibility {
  protected readonly questions = QUESTIONS;
  protected readonly answers = signal<boolean[]>([]);
  protected readonly index = computed(() => this.answers().length);
  protected readonly current = computed(() => QUESTIONS[this.index()]);
  protected readonly done = computed(() => this.index() >= QUESTIONS.length || this.blockers().length > 0);
  protected readonly blockers = computed(() =>
    this.answers().map((a, i) => (a === QUESTIONS[i].ok ? null : QUESTIONS[i])).filter((q): q is Question => !!q),
  );
  protected readonly progress = computed(() => Math.round((this.index() / QUESTIONS.length) * 100));
  private readonly title = viewChild<ElementRef<HTMLElement>>('focusTarget');

  protected answer(value: boolean): void {
    this.answers.update((a) => [...a, value]);
    this.refocus();
  }
  protected back(): void {
    this.answers.update((a) => a.slice(0, -1));
    this.refocus();
  }
  protected restart(): void {
    this.answers.set([]);
    this.refocus();
  }
  private refocus(): void {
    queueMicrotask(() => setTimeout(() => this.title()?.nativeElement.focus({ preventScroll: true })));
  }
}
