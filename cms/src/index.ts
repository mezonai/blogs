import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (publicRole) {
      const publicActions = ['api::blog.blog.find', 'api::blog.blog.findOne'];

      async function ensurePermissions(roleId: any, actions: string[]) {
        for (const action of actions) {
          let permission = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { role: roleId, action },
          });

          if (permission) {
            if (!permission.enabled) {
              await strapi.db.query('plugin::users-permissions.permission').update({
                where: { id: permission.id },
                data: { enabled: true },
              });
            }
          } else {
            const parts = action.split('.');
            const subject = parts.length > 1 ? parts.slice(0, -1).join('.') : null; // In v5 subject is usually the api name

            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: roleId,
                enabled: true,
              },
            });
          }
        }
      }
      await ensurePermissions(publicRole.id, publicActions);
    }
  },
};
