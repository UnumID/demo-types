import {
  CredentialRequest,
  EncryptedData,
  IssuerInfoMap,
  NoPresentation,
  Presentation,
  PresentationRequestPostDto
} from '@unumid/types';

// base type which encapsulates properties shared by all database entities
// in the demos
interface DemoBaseEntity {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

// helper which adds a named key with a specific value type to an existing type
type WithKeyAndValue<T, K extends string, V> = T & Record<K, V>;

// base type which encapsulates properties shared by many objects returned
// from the demo issuer and verifier apis
export type DemoDto<T, N extends string> = WithKeyAndValue<DemoBaseEntity, N, T>;

// helper type which adds a boolean 'isVerified' property to an existing type
export type WithVerification<T> = WithKeyAndValue<T, 'isVerified', boolean>;

// type of the Session entity used by demo verifiers
// really just an alias for DemoBaseEntity, as Session entities
// don't have any other meaningful properties
export type DemoSession = DemoBaseEntity;

// type of the object expected by verifier servers to create a PresentationRequest
export interface DemoPresentationRequestCreateOptions {
  credentialRequests: CredentialRequest[];
  metadata: { sessionUuid: string };
}

// type of the object returned by verifier servers when a PresentationRequest is created or gotten
export type DemoPresentationRequestDto = DemoDto<PresentationRequestPostDto, 'presentationRequestPostDto'>;

// type of the object published by verifier servers when a shared Presentation is received + verified
export type DemoPresentationDto = WithVerification<DemoDto<Presentation, 'presentation'>>;

// type of the object published by verifier servers when a shared NoPresentation is received + verified
export type DemoNoPresentationDto = WithVerification<DemoDto<NoPresentation, 'noPresentation'>>;

// type of the FcmRegistrationToken object returned with DemoUsers
export interface DemoFcmRegistrationToken extends DemoBaseEntity {
  token: string;
}

// type of the object expected by the issuer server to create a User
export interface DemoUserCreateOptions {
  email: string;
  password: string;
  phone?: string;
}

// serialization of the User type used by issuer server
type DemoUser = Omit<DemoUserCreateOptions, 'password'> & DemoBaseEntity & {
  did?: string;
  fcmRegistrationTokens: DemoFcmRegistrationToken[];
};

// /**
//  * Type to encapsulate an encrypted presentation sent from the UnumID SaaS
//  */
// export interface EncryptedPresentation {
//   presentationRequestUuid: string;
//   encryptedPresentation: EncryptedData;
//   // verifierDid: string // TODO add after added to mobile sdk
// }


// /**
//  * Type to encapsulate the non sensitive decrypted presentation information to help enrich UnumID's SaaS reporting dashboard.
//  */
// export interface PresentationReceiptInfo {
//   subjectDid: string;
//   verifierDid: string;
//   holderApp: string;
//   credentialTypes?: string[];
//   issuers?: IssuerInfoMap;
// }

// /**
//  * Type to encapsulate the response that the UnumID SaaS is expecting after forwarding the encrypted presentation to the verifier app for verification
//  */
// export interface VerificationResponse {
//   isVerified: boolean;
//   type: 'VerifiablePresentation' | 'NoPresentation';
//   presentationReceiptInfo: PresentationReceiptInfo;
//   presentationRequestUuid: string;
//   presentation: Presentation;
// }