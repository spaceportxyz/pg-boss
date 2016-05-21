var assert = require('chai').assert;
var PgBoss = require('../src/index');
var helper = require('./testHelper');

describe('examples', function(){
    it('readme example is totes valid', function(finished){
        var connectionString = helper.connectionString;
        
        // example start
        var boss = new PgBoss(connectionString);
        
        boss.start()
            .then(ready)
            .catch(error => console.error(error));
        
        function ready() {
            boss.publish('work', {message: 'stuff'})
                .then(jobId => console.log(`sent job ${jobId}`));

            boss.subscribe('work', (job, done) => {
                console.log(`got job ${job.name} (${job.id}) ${JSON.stringify(job.data)}`);

                done().then(() => {
                    console.log('Confirmed done');
                    assert.equal('work', job.name); // exclude test code
                    assert.equal('stuff', job.data.message); // exclude test code
                    finished();   // exclude test code
                });
            });
        }
        // example end
    });
});