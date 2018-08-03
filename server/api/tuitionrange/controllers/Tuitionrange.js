'use strict';

/**
 * Tuitionrange.js controller
 *
 * @description: A set of functions called "actions" for managing `Tuitionrange`.
 */

module.exports = {

  /**
   * Retrieve tuitionrange records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.tuitionrange.search(ctx.query);
    } else {
      return strapi.services.tuitionrange.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a tuitionrange record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.tuitionrange.fetch(ctx.params);
  },

  /**
   * Count tuitionrange records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.tuitionrange.count(ctx.query);
  },

  /**
   * Create a/an tuitionrange record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.tuitionrange.add(ctx.request.body);
  },

  /**
   * Update a/an tuitionrange record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.tuitionrange.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an tuitionrange record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.tuitionrange.remove(ctx.params);
  }
};
