/**
 * user-document controller
 */
// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::user-document.user-document', ({ strapi }) => ({

//     async createUserDocument(ctx: any): Promise<any> {
//         const { panCardNo, panImage, licenceNo, licenceImage} = ctx.request.body;
//         console.log(ctx.request.body);
//         console.log(panCardNo);
//         if (!panCardNo || !panImage || !licenceImage || !licenceNo) {
//             throw new Error('PanCard and License are required for drivers');
//         }
//         try {
//             console.log('hello_try');
//             const sanitizedEntity = await strapi.service('api::user-document.user-document').sanitizeInput(ctx.request.body);
//             // const sanitizedEntity = await strapi.services.userdocument.sanitizeInput(ctx.request.body);
//             console.log(sanitizedEntity);
//             const userDocument = await strapi.service('api::user-document.user-document').create(sanitizedEntity);
//             console.log(userDocument);
//             return sanitizedEntity(userDocument, { model: strapi.service('api::user-document.user-document').model });
//         } catch (err) {
//             throw new Error('Failed to create user document');
//         }
//     },

// }));

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::user-document.user-document')

//-----------------custom controller----------------------//
// , ({ strapi }) => ({

//     async createUserDocument(ctx: any): Promise<any> {
//         const { body } = ctx.request;
//         const { user ,panCardNo, panImage, licenceNo, licenceImage } = ctx.request.body.data;
//         // Check if required fields are provided
//         console.log(ctx.request.body);
//         const user_id = await strapi.db.query('plugin::users-permissions.user').findOne({
//             where: {
//                 id: user
//             }
//         });
//         console.log(user_id);
//         if (!panCardNo || !panImage || !licenceImage || !licenceNo) {
//             throw new Error('PanCard and License are required for drivers');
//         }
//         try {
//             const createdEntry = await strapi.query('api::user-document.user-document').create(body);
//             console.log(createdEntry);
//             return ctx.send({ ok: true, data: createdEntry });
//         } catch (err) {
//             console.error('Error creating user document:', err);

//             // Rethrow the error or handle it as needed
//             throw new Error('Failed to create user document');
//         }
//     },

// }));