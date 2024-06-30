export type ConnectionType = {
  id: string;
  sourceId: string;
  destinationId: string;
  active: boolean;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  source: SourceType;
  destination: DestinationType;
};

export type SourceType = {
  id: string;
  name: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DestinationType = {
  id: string;
  name: string;
  url: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
};
