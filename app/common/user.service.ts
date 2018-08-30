import { Injectable } from '@angular/core';

@Injectable()
export class CommonUserService {
	private difficultyOptions: string[] = [
		'simple', 'intermediate', 'advanced'
	];
	private difficulty: string = this.difficultyOptions[0];
	private airspaceOptions: string[] = [
		'A', 'C', 'D', 'E', 'G', 'CTAF'
	];
	private airspace: string = this.airspaceOptions[0];

  constructor() { }

	getCurrentAirspace(): string {
		return this.airspace;
	}


	getCurrentDifficulty(): string {
		return this.difficulty;
	}

	getKnownAirspace() : string[] {
		return this.airspaceOptions;
	}

	getKnownDifficulty() : string[] {
		return this.difficultyOptions;
	}

	setAirspace(airspace: string) {
		this.airspace = airspace;
	}

	setDifficulty(difficulty: string) {
		this.difficulty = difficulty;
	}

}
