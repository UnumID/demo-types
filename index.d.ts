import { CredentialRequest, NoPresentation, Presentation, PresentationRequestPostDto } from '@unumid/types';

interface DemoBaseEntity {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

type WithKeyAndValue<T, K extends string, V> = T & Record<K, V>;

export type DemoDto<T, N extends string> = WithKeyAndValue<DemoBaseEntity, N, T>;
export type WithVerification<T> = WithKeyAndValue<T, 'isVerified', boolean>;

export type DemoSession = DemoBaseEntity;

export interface DemoPresentationRequestOptions {
  credentialRequests: CredentialRequest[];
  metadata: { sessionUuid: string };
}

export type DemoPresentationRequestDto = DemoDto<PresentationRequestPostDto, 'presentationRequest'>;

export type DemoPresentationDto = WithVerification<DemoDto<Presentation, 'presentation'>>;

export type DemoNoPresentationDto = WithVerification<DemoDto<NoPresentation, 'noPresentation'>>;
