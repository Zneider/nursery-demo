export type ChildrenResponse = {
  children: Array<Child>;
};

export type Child = {
  childId: string;
  institutionId: string;
  groupId: string;
  createdTime: Date;
  name: {
    fullName: string;
    firstName: string;
    middleName: string;
    lastName: string;
  };
  birthday: Date;
  homeAddress: string | null;
  extraInfo: string;
  language: string;
  nationality: string;
  birthplace: string;
  gender: number;
  startDate: Date;
  endDate: Date | null;
  leavingReason: string | null;
  isTestChild: boolean;
  relations: string[] | null;
  image: {
    small: string;
    large: string;
    empty: boolean;
    colorCode: number;
  };
  isSleeping: boolean;
  naps: any[];
  hasVacation: boolean;
  isSick: boolean;
  isAbsent: boolean;
  leaves: any[];
  onBus: boolean;
  onTrip: boolean;
  statuses: any[];
  statusRegistrations: any[];
  checkins: any[];
  checkedIn: boolean;
  checkinTime: Date | null;
  pickupTime: Date | null;
  pickupRelationId: string | null;
  pickupName: string;
};
