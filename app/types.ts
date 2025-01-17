export interface ApiResponse<T> {
  results: T[];
}

export interface Person {
  name: string;
  height: string;
  mass: string;
}

export interface Spaceship {
  name: string;
  model: string;
  manufacturer: string;
}

export interface Planet {
  name: string;
  climate: string;
  population: string;
}