export interface Timezone {
	id: number;
	city: string;
	offset: number;
}

export interface Clock {
	id: number;
	timezone: Timezone;
}

export interface ClockProps {
	clock: Clock;
}

export interface ClocksState {
	clocks: Clock[];
	timezones: Timezone[];
	isLoading: boolean;
	error: string | null;
}

export interface DigitalTimeProps {
  time: Date;
}

export interface TimezoneSelectProps {
  handleChangeTimezone: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  availableTimezones: Timezone[];
  clock: Clock;
}

