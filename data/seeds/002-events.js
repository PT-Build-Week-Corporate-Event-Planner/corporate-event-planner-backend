const faker = require('faker');
const moment = require('moment');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          event_title: 'Monthly Meetup',
          event_description: 'A monthly meetup',
          image_url: 'https://picsum.photos/id/237/200/300',
          event_date: moment(faker.date.future()).unix(),
          event_time: '16:00 PM',
          attendees: 60,
          budget: 1600,
          user_id: 1,
        },
        {
          event_title: 'Tech Conference',
          event_description: 'a great tech conference',
          image_url: 'https://picsum.photos/id/237/200/300',
          event_date: moment(faker.date.future()).unix(),
          event_time: '10:00 PM',
          attendees: 27,
          budget: 600,
          user_id: 2,
        },
        {
          event_title: 'Negotiations Skills',
          event_description: 'a session on negotiation',
          image_url: 'https://picsum.photos/id/237/200/300',
          event_date: moment(faker.date.future()).unix(),
          event_time: '12:00 PM',
          attendees: 10,
          budget: 600,
          user_id: 3,
        }
      ]);
    });
};
