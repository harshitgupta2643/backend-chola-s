import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    firstName: Attribute.String & Attribute.Required;
    lastName: Attribute.String & Attribute.Required;
    phoneNo: Attribute.String & Attribute.Required & Attribute.Unique;
    verified: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    userType: Attribute.Enumeration<['RIDER', 'DRIVER']> & Attribute.Required;
    dob: Attribute.Date & Attribute.Required;
    profileImage: Attribute.Text;
    bloodGroup: Attribute.Enumeration<
      [
        'A_POSITIVE',
        'A_NEGATIVE',
        'B_POSITIVE',
        'B_NEGATIVE',
        'AB_POSITIVE',
        'AB_NEGATIVE',
        'O_POSITIVE',
        'O_NEGATIVE'
      ]
    >;
    registeredOn: Attribute.DateTime & Attribute.Required;
    updatedOn: Attribute.DateTime & Attribute.Required;
    auth: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::auth.auth'
    >;
    vehicle: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::vehicle.vehicle'
    >;
    vehicle_document: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::vehicle-document.vehicle-document'
    >;
    rider_ride_histories: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::ride-history.ride-history'
    >;
    user_document: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::user-document.user-document'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdminAdmin extends Schema.CollectionType {
  collectionName: 'admins';
  info: {
    singularName: 'admin';
    pluralName: 'admins';
    displayName: 'Admin';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    role: Attribute.Enumeration<['ADMIN', 'REPRESENTATIVE']> &
      Attribute.Required;
    username: Attribute.String & Attribute.Required & Attribute.Unique;
    password: Attribute.Password &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 8;
      }>;
    isBanned: Attribute.Boolean & Attribute.DefaultTo<false>;
    bannedReason: Attribute.Text;
    createdOn: Attribute.DateTime & Attribute.Required;
    updatedOn: Attribute.DateTime & Attribute.Required;
    admin_permisions: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::admin-permision.admin-permision'
    >;
    vehicle_types: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::vehicle-type.vehicle-type'
    >;
    vehicles: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::vehicle.vehicle'
    >;
    rc_vehicle_documents: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::vehicle-document.vehicle-document'
    >;
    insurance_vehicle_documents: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::vehicle-document.vehicle-document'
    >;
    pollution_vehicle_documents: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::vehicle-document.vehicle-document'
    >;
    added_insurance_providers: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::insurance-provider.insurance-provider'
    >;
    updated_insurance_providers: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::insurance-provider.insurance-provider'
    >;
    banned_insurance_providers: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::insurance-provider.insurance-provider'
    >;
    added_payment_methods: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::payment-method.payment-method'
    >;
    updated_payment_methods: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::payment-method.payment-method'
    >;
    banned_payment_methods: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::payment-method.payment-method'
    >;
    added_ride_cancellation_reasons: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::ride-cancellation.ride-cancellation'
    >;
    updated_ride_cancellation_reasons: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::ride-cancellation.ride-cancellation'
    >;
    added_allowed_locations: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::allowed.allowed'
    >;
    updated_allowed_locations: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::allowed.allowed'
    >;
    banned_allowed_locations: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::allowed.allowed'
    >;
    driver_ride_histories: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::ride-history.ride-history'
    >;
    aadhar_user_documents: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::user-document.user-document'
    >;
    pan_user_documents: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::user-document.user-document'
    >;
    licence_user_documents: Attribute.Relation<
      'api::admin.admin',
      'oneToMany',
      'api::user-document.user-document'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::admin.admin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::admin.admin',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdminPermisionAdminPermision extends Schema.CollectionType {
  collectionName: 'admin_permisions';
  info: {
    singularName: 'admin-permision';
    pluralName: 'admin-permisions';
    displayName: 'admin-permision';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    write: Attribute.Boolean & Attribute.DefaultTo<false>;
    update: Attribute.Boolean & Attribute.DefaultTo<false>;
    delete: Attribute.Boolean & Attribute.DefaultTo<false>;
    download: Attribute.Boolean & Attribute.DefaultTo<false>;
    addedOn: Attribute.DateTime & Attribute.Required;
    admin: Attribute.Relation<
      'api::admin-permision.admin-permision',
      'manyToOne',
      'api::admin.admin'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::admin-permision.admin-permision',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::admin-permision.admin-permision',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAllowedAllowed extends Schema.CollectionType {
  collectionName: 'alloweds';
  info: {
    singularName: 'allowed';
    pluralName: 'alloweds';
    displayName: 'AllowedLocations';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    location: Attribute.Text & Attribute.Required & Attribute.Unique;
    addedOn: Attribute.DateTime & Attribute.Required;
    updatedOn: Attribute.DateTime & Attribute.Required;
    isBanned: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    bannedReason: Attribute.Text;
    addedby: Attribute.Relation<
      'api::allowed.allowed',
      'manyToOne',
      'api::admin.admin'
    >;
    updatedby: Attribute.Relation<
      'api::allowed.allowed',
      'manyToOne',
      'api::admin.admin'
    >;
    bannedby: Attribute.Relation<
      'api::allowed.allowed',
      'manyToOne',
      'api::admin.admin'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::allowed.allowed',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::allowed.allowed',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuthAuth extends Schema.CollectionType {
  collectionName: 'auths';
  info: {
    singularName: 'auth';
    pluralName: 'auths';
    displayName: 'Auth';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    users_permissions_user: Attribute.Relation<
      'api::auth.auth',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    authType: Attribute.Enumeration<['EMAIL', 'GOOGLE', 'FACEBOOK', 'OTP']>;
    identifier: Attribute.String & Attribute.Required;
    password: Attribute.Password & Attribute.Required;
    token: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::auth.auth', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::auth.auth', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiInsuranceProviderInsuranceProvider
  extends Schema.CollectionType {
  collectionName: 'insurance_providers';
  info: {
    singularName: 'insurance-provider';
    pluralName: 'insurance-providers';
    displayName: 'InsuranceProvider';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    providerName: Attribute.String & Attribute.Required;
    addedOn: Attribute.DateTime & Attribute.Required;
    updatedOn: Attribute.DateTime & Attribute.Required;
    isBanned: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    bannedReason: Attribute.Text;
    addedby: Attribute.Relation<
      'api::insurance-provider.insurance-provider',
      'manyToOne',
      'api::admin.admin'
    >;
    updatedby: Attribute.Relation<
      'api::insurance-provider.insurance-provider',
      'manyToOne',
      'api::admin.admin'
    >;
    bannedby: Attribute.Relation<
      'api::insurance-provider.insurance-provider',
      'manyToOne',
      'api::admin.admin'
    >;
    insurance_vehicle_documents: Attribute.Relation<
      'api::insurance-provider.insurance-provider',
      'oneToMany',
      'api::vehicle-document.vehicle-document'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::insurance-provider.insurance-provider',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::insurance-provider.insurance-provider',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentMethodPaymentMethod extends Schema.CollectionType {
  collectionName: 'payment_methods';
  info: {
    singularName: 'payment-method';
    pluralName: 'payment-methods';
    displayName: 'PaymentMethod';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    paymentMethod: Attribute.String & Attribute.Required;
    addedOn: Attribute.DateTime & Attribute.Required;
    updatedOn: Attribute.DateTime & Attribute.Required;
    isBanned: Attribute.Boolean & Attribute.DefaultTo<false>;
    bannedReason: Attribute.Text;
    addedby: Attribute.Relation<
      'api::payment-method.payment-method',
      'manyToOne',
      'api::admin.admin'
    >;
    updatedby: Attribute.Relation<
      'api::payment-method.payment-method',
      'manyToOne',
      'api::admin.admin'
    >;
    bannedby: Attribute.Relation<
      'api::payment-method.payment-method',
      'manyToOne',
      'api::admin.admin'
    >;
    payment_ride_histories: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToMany',
      'api::ride-history.ride-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRideCancellationRideCancellation
  extends Schema.CollectionType {
  collectionName: 'ride_cancellations';
  info: {
    singularName: 'ride-cancellation';
    pluralName: 'ride-cancellations';
    displayName: 'RideCancellationReason';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cause: Attribute.String & Attribute.Required;
    addedOn: Attribute.DateTime & Attribute.Required;
    updatedOn: Attribute.DateTime & Attribute.Required;
    addedby: Attribute.Relation<
      'api::ride-cancellation.ride-cancellation',
      'manyToOne',
      'api::admin.admin'
    >;
    updatedby: Attribute.Relation<
      'api::ride-cancellation.ride-cancellation',
      'manyToOne',
      'api::admin.admin'
    >;
    ride_histories: Attribute.Relation<
      'api::ride-cancellation.ride-cancellation',
      'manyToMany',
      'api::ride-history.ride-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ride-cancellation.ride-cancellation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ride-cancellation.ride-cancellation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRideHistoryRideHistory extends Schema.CollectionType {
  collectionName: 'ride_histories';
  info: {
    singularName: 'ride-history';
    pluralName: 'ride-histories';
    displayName: 'RideHistory';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    pickupLocation: Attribute.Text & Attribute.Required;
    dropLocation: Attribute.Text & Attribute.Required;
    fare: Attribute.String & Attribute.Required;
    rideStatus: Attribute.Enumeration<
      ['MATCHING', 'MATCHED', 'RIDESTARTED', 'COMPLETED', 'CANCELLED']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'MATCHING'>;
    rideRating: Attribute.Integer & Attribute.Required;
    createdOn: Attribute.DateTime & Attribute.Required;
    rideruser: Attribute.Relation<
      'api::ride-history.ride-history',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    driveruser: Attribute.Relation<
      'api::ride-history.ride-history',
      'manyToOne',
      'api::admin.admin'
    >;
    vehicle_type: Attribute.Relation<
      'api::ride-history.ride-history',
      'manyToOne',
      'api::vehicle-type.vehicle-type'
    >;
    payment_method: Attribute.Relation<
      'api::ride-history.ride-history',
      'manyToOne',
      'api::payment-method.payment-method'
    >;
    ride_cancellation_reasons: Attribute.Relation<
      'api::ride-history.ride-history',
      'manyToMany',
      'api::ride-cancellation.ride-cancellation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ride-history.ride-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ride-history.ride-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUserDocumentUserDocument extends Schema.CollectionType {
  collectionName: 'user_documents';
  info: {
    singularName: 'user-document';
    pluralName: 'user-documents';
    displayName: 'UserDocument';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aadharCardNo: Attribute.String;
    aadharFront: Attribute.Text;
    aadharBack: Attribute.Text;
    aadharVerified: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    panCardNo: Attribute.String;
    panImage: Attribute.Text;
    panVerified: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    licenceNo: Attribute.String;
    licenceImage: Attribute.Text;
    licenceVerified: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    user: Attribute.Relation<
      'api::user-document.user-document',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    aadharverifiedby: Attribute.Relation<
      'api::user-document.user-document',
      'manyToOne',
      'api::admin.admin'
    >;
    panverifiedby: Attribute.Relation<
      'api::user-document.user-document',
      'manyToOne',
      'api::admin.admin'
    >;
    licenceverifiedby: Attribute.Relation<
      'api::user-document.user-document',
      'manyToOne',
      'api::admin.admin'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::user-document.user-document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::user-document.user-document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVehicleVehicle extends Schema.CollectionType {
  collectionName: 'vehicles';
  info: {
    singularName: 'vehicle';
    pluralName: 'vehicles';
    displayName: 'Vehicle';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    user: Attribute.Relation<
      'api::vehicle.vehicle',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    fuelType: Attribute.Enumeration<['PETROL', 'DIESEL', 'CNG', 'ELECTRIC']> &
      Attribute.Required;
    vehicleNo: Attribute.String & Attribute.Required & Attribute.Unique;
    verified: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    verifiedby: Attribute.Relation<
      'api::vehicle.vehicle',
      'manyToOne',
      'api::admin.admin'
    >;
    vehicleImages: Attribute.Media & Attribute.Required;
    registeredOn: Attribute.DateTime & Attribute.Required;
    updatedOn: Attribute.DateTime & Attribute.Required;
    vehicle_type: Attribute.Relation<
      'api::vehicle.vehicle',
      'manyToOne',
      'api::vehicle-type.vehicle-type'
    >;
    vehicle_document: Attribute.Relation<
      'api::vehicle.vehicle',
      'oneToOne',
      'api::vehicle-document.vehicle-document'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vehicle.vehicle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vehicle.vehicle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVehicleDocumentVehicleDocument
  extends Schema.CollectionType {
  collectionName: 'vehicle_documents';
  info: {
    singularName: 'vehicle-document';
    pluralName: 'vehicle-documents';
    displayName: 'VehicleDocument';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    vehicle: Attribute.Relation<
      'api::vehicle-document.vehicle-document',
      'oneToOne',
      'api::vehicle.vehicle'
    >;
    user: Attribute.Relation<
      'api::vehicle-document.vehicle-document',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    rcNo: Attribute.String & Attribute.Required & Attribute.Unique;
    rcExpiryDate: Attribute.Date & Attribute.Required;
    rcImage: Attribute.String & Attribute.Required;
    rcVerified: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    rc_verifiedby: Attribute.Relation<
      'api::vehicle-document.vehicle-document',
      'manyToOne',
      'api::admin.admin'
    >;
    insurance: Attribute.String;
    insuranceExpiryDate: Attribute.Date;
    insuranceVerified: Attribute.Boolean & Attribute.DefaultTo<false>;
    insurance_verifiedby: Attribute.Relation<
      'api::vehicle-document.vehicle-document',
      'manyToOne',
      'api::admin.admin'
    >;
    pollution: Attribute.String;
    pollutionExpiryDate: Attribute.Date;
    pollutionVerified: Attribute.Boolean & Attribute.DefaultTo<false>;
    pollution_verifiedby: Attribute.Relation<
      'api::vehicle-document.vehicle-document',
      'manyToOne',
      'api::admin.admin'
    >;
    insurance_provider: Attribute.Relation<
      'api::vehicle-document.vehicle-document',
      'manyToOne',
      'api::insurance-provider.insurance-provider'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vehicle-document.vehicle-document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vehicle-document.vehicle-document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVehicleTypeVehicleType extends Schema.CollectionType {
  collectionName: 'vehicle_types';
  info: {
    singularName: 'vehicle-type';
    pluralName: 'vehicle-types';
    displayName: 'VehicleType';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    vehicletype: Attribute.String;
    createdby: Attribute.Relation<
      'api::vehicle-type.vehicle-type',
      'manyToOne',
      'api::admin.admin'
    >;
    createdOn: Attribute.DateTime & Attribute.Required;
    updatedOn: Attribute.DateTime & Attribute.Required;
    updatedby: Attribute.Relation<
      'api::vehicle-type.vehicle-type',
      'manyToOne',
      'api::admin.admin'
    >;
    vehicles: Attribute.Relation<
      'api::vehicle-type.vehicle-type',
      'oneToMany',
      'api::vehicle.vehicle'
    >;
    vehicle_type_ride_histories: Attribute.Relation<
      'api::vehicle-type.vehicle-type',
      'oneToMany',
      'api::ride-history.ride-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vehicle-type.vehicle-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vehicle-type.vehicle-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::admin.admin': ApiAdminAdmin;
      'api::admin-permision.admin-permision': ApiAdminPermisionAdminPermision;
      'api::allowed.allowed': ApiAllowedAllowed;
      'api::auth.auth': ApiAuthAuth;
      'api::insurance-provider.insurance-provider': ApiInsuranceProviderInsuranceProvider;
      'api::payment-method.payment-method': ApiPaymentMethodPaymentMethod;
      'api::ride-cancellation.ride-cancellation': ApiRideCancellationRideCancellation;
      'api::ride-history.ride-history': ApiRideHistoryRideHistory;
      'api::user-document.user-document': ApiUserDocumentUserDocument;
      'api::vehicle.vehicle': ApiVehicleVehicle;
      'api::vehicle-document.vehicle-document': ApiVehicleDocumentVehicleDocument;
      'api::vehicle-type.vehicle-type': ApiVehicleTypeVehicleType;
    }
  }
}
