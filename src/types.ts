export type TimeOption = 'sore' | 'magrib' | 'custom' | null;
export type PlaceOption = 'rumah' | 'tempat_lain' | null;

export interface BirthdayPlanState {
  recipientName: string;
  time: TimeOption;
  customTime: string;
  place: PlaceOption;
  customPlace: string;
  customNotes?: string;
  isConfirmed: boolean;
  step: 'plan' | 'result' | 'confirmed';
}
