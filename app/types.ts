export interface Person {
  name: string;
  height: string;
  mass: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

export interface Planet {
  name: string;
  climate: string;
  population: string;
}
export interface ApiResponse<T> {
  results: T[];
}