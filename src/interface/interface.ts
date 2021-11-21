export interface User {
  name: string;
  id: string;
  email: string;
  profile_picture: string;
}

export interface Tournament {
  id: string;
  name: string;
  capacity: string;
  currently_joined: number;
  winner: string;
  entery_fee: number;
  isClosed: boolean;
  prize: string;
  players: Player[];
  start_time: Date;
}

export interface Player {
  email: string;
  name: string;
  uid: string;
  profile_picture: string;
}
