export interface Vis {
	max: number;
	min: number;
	comment: string;
}
export interface Cloud {
	base: number;
	tops: number;
	coverage: number;
}
export interface Weather {
  qnh: string;
  windStrength: number;
  windGustStrength: number;
  windDirection: number;
  windDirectionVariation: number;

  cloud: Cloud[];
  temp: number;
  dewpoint: number;
  vis: Vis;
  groundCondition: string;
  wx: string[];
}
