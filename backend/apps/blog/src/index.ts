import '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    const publicActions = ['api::blog.blog.find', 'api::blog.blog.findOne'];

    async function ensurePermissions(roleId: number, actions: string[]) {
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
          const subject = parts.length > 1 ? parts[1] : null;

          await strapi.db.query('plugin::users-permissions.permission').create({
            data: {
              action,
              role: roleId,
              enabled: true,
              subject,
            },
          });
        }
      }
    }
    await ensurePermissions(publicRole.id, publicActions);
  },
};
