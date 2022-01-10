import {
  CredentialRequest,
  Presentation,
  PresentationRequestPostDto,
  PushToken,
  WithKeyAndValue
} from '@unumid/types';

// base type which encapsulates properties shared by all database entities
// in the demos
interface DemoBaseEntity {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

// base type which encapsulates properties shared by many objects returned
// from the demo issuer and verifier apis
export type DemoDto<T, N extends string> = WithKeyAndValue<DemoBaseEntity, N, T>;

// helper type which adds a boolean 'isVerified' property to an existing type
export type WithVerification<T> = WithKeyAndValue<T, 'isVerified', boolean>;

// type of the Session entity used by demo verifiers
// really just an alias for DemoBaseEntity, as Session entities
// don't have any other meaningful properties
export type DemoSession = DemoBaseEntity;

// type of the object expected by verifier servers, sent by the clients to create a PresentationRequest
export interface DemoPresentationRequestCreateOptions {
  credentialRequests: CredentialRequest[];
  metadata: { fields: { sessionUuid: string } };
  holderAppUuid?: string; // optional because often times can be a constant config variable on the server, however not always
}

// type of the object returned by verifier servers when a PresentationRequest is created or gotten
export type DemoPresentationRequestDto = DemoDto<PresentationRequestPostDto, 'presentationRequestPostDto'>;

// type of the object published by verifier servers when a shared Presentation is received + verified
export type DemoPresentationDto = WithVerification<DemoDto<Presentation, 'presentation'>>;

// type of the object expected by the issuer server to create a User
export interface DemoUserCreateOptions {
  email: string;
  firstName?: string;
  password: string;
  phone?: string;
}

// serialization of the User type used by issuer server
type DemoUser = Omit<DemoUserCreateOptions, 'password'> & DemoBaseEntity & {
  did?: string;
  pushTokens: PushToken[];
};
