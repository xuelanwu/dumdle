"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "DogImages",
      [
        {
          dogId: 1,
          url: "https://firebasestorage.googleapis.com/v0/b/dumdle-cce57.appspot.com/o/dog-images%2FWechatIMG139.jpeg?alt=media&token=cac538a3-ae8b-4c16-b4d5-284866676627",
        },
        {
          dogId: 1,
          url: "https://firebasestorage.googleapis.com/v0/b/dumdle-cce57.appspot.com/o/dog-images%2FWechatIMG146.jpeg?alt=media&token=7b2c23fc-1b9c-4b4c-9916-674970ff7510",
        },
        {
          dogId: 1,
          url: "https://firebasestorage.googleapis.com/v0/b/dumdle-cce57.appspot.com/o/dog-images%2FWechatIMG149.jpeg?alt=media&token=2fa4d234-868d-48a6-b36a-3cf1859bd3f4",
        },
        {
          dogId: 2,
          url: "https://images.pexels.com/photos/1938126/pexels-photo-1938126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 2,
          url: "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 2,
          url: "https://images.pexels.com/photos/1124002/pexels-photo-1124002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 3,
          url: "https://images.pexels.com/photos/14267214/pexels-photo-14267214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 3,
          url: "https://images.pexels.com/photos/11335034/pexels-photo-11335034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 3,
          url: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 4,
          url: "https://images.pexels.com/photos/800330/pexels-photo-800330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 4,
          url: "https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 4,
          url: "https://images.pexels.com/photos/825949/pexels-photo-825949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 5,
          url: "https://images.pexels.com/photos/9294302/pexels-photo-9294302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 5,
          url: "https://images.pexels.com/photos/5108127/pexels-photo-5108127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 5,
          url: "https://images.pexels.com/photos/1870301/pexels-photo-1870301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 6,
          url: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 6,
          url: "https://images.pexels.com/photos/248307/pexels-photo-248307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 6,
          url: "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 7,
          url: "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 7,
          url: "https://images.pexels.com/photos/931876/pexels-photo-931876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 7,
          url: "https://images.pexels.com/photos/7060708/pexels-photo-7060708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 8,
          url: "https://images.pexels.com/photos/7753246/pexels-photo-7753246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 8,
          url: "https://images.pexels.com/photos/2918094/pexels-photo-2918094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 8,
          url: "https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("DogImage", null, {});
  },
};
