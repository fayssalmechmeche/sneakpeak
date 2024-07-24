import { DataTypes, Sequelize } from 'sequelize';
import { Migration } from '../bin/migrate';

// ATTENTION à bien underscorer manuellement les noms de colonnes
export const up: Migration = async ({
  context: sequelize,
}: {
  context: Sequelize;
}) => {
  await sequelize
    .getQueryInterface()
    .addColumn('order_products', 'link_refund', {
      type: DataTypes.TEXT,
      allowNull: true,
    });
};

export const down: Migration = async ({
  context: sequelize,
}: {
  context: Sequelize;
}) => {
  await sequelize
    .getQueryInterface()
    .removeColumn('order_products', 'link_refund');
};