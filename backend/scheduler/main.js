const mongoose = require('mongoose');
const Agenda = require('agenda');
require('dotenv').config()
const {ResetSubscriptionsMonthlyMessagesService} = require('../services/cronJobs/resetSubscriptionsMonthly/resetSubscriptionsMonthlyService');
const db_uri = process.env.DB_URI;

const resetMonthlyMessagesAgenda = new Agenda({db: {address: db_uri}, defaultConcurrency: 1});

resetMonthlyMessagesAgenda.define('resetSubscriptionMonthlyMessages', async job => {
    try { 
        console.log('Starting reset monthly messages at', new Date());
        let resetService = new ResetSubscriptionsMonthlyMessagesService();
        await resetService.do();
        console.log('Finished reset monthly messages at', new Date());
    } catch (error) {
        console.log("RESET MONTHLY SUB FAILED: ", error);
    }
});

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Scheduler Connected to MongoDB');
        // Start Agendas and schedule the jobs
        await resetMonthlyMessagesAgenda.start();
        await resetMonthlyMessagesAgenda.every('0 0 * * *', 'resetSubscriptionMonthlyMessages');
    }).catch((err) => {
        console.error(err);
    });