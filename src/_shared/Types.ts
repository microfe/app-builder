export type Nope = 'nope';

export interface ModelBase {
  readonly createdAt?: string | undefined;
  readonly createdBy?: string | undefined;
  readonly updatedAt?: string | undefined;
  readonly updateBy?: string | undefined;
  readonly deletedAt?: string | undefined;
  readonly deletedBy?: string | undefined;
}