/**
 * Copyright 2012-2017 Red Hat, Inc.
 *
 * Thermostat is distributed under the GNU General Public License,
 * version 2 or any later version (with a special exception described
 * below, commonly known as the "Classpath Exception").
 *
 * A copy of GNU General Public License (GPL) is included in this
 * distribution, in the file COPYING.
 *
 * Linking Thermostat code with other modules is making a combined work
 * based on Thermostat.  Thus, the terms and conditions of the GPL
 * cover the whole combination.
 *
 * As a special exception, the copyright holders of Thermostat give you
 * permission to link this code with independent modules to produce an
 * executable, regardless of the license terms of these independent
 * modules, and to copy and distribute the resulting executable under
 * terms of your choice, provided that you also meet, for each linked
 * independent module, the terms and conditions of the license of that
 * module.  An independent module is a module which is not derived from
 * or based on Thermostat code.  If you modify Thermostat, you may
 * extend this exception to your version of the software, but you are
 * not obligated to do so.  If you do not wish to do so, delete this
 * exception statement from your version.
 *
 * --------------------------------------------------------------------------------
 * Additional files and licenses
 * --------------------------------------------------------------------------------
 *
 * Thermostat uses Font Awesome by Dave Gandy (http://fontawesome.io) as primary
 * icon resource, distributed under the SIL OFL 1.1 (http://scripts.sil.org/OFL).
 * A copy of the OFL 1.1 license is also included and distributed with Thermostat.
 */

describe('JvmListRouting', () => {

  let module = require('./jvm-list.routing.js');

  let stateProvider, args, q, ocLazyLoad;
  beforeEach(() => {
    stateProvider = {
      state: sinon.spy()
    };
    module.config(stateProvider);
    args = stateProvider.state.args[0];
    q = sinon.spy();
    ocLazyLoad = {
      load: sinon.spy()
    };
  });

  describe('stateProvider', () => {
    it('should call $stateProvider.state', () => {
      stateProvider.state.should.be.calledOnce();
    });

    it('should define a \'jvmList\' state', () => {
      args[0].should.equal('jvmList');
    });

    it('should map to /jvm-list', () => {
      args[1].url.should.equal('/jvm-list');
    });

    it('template provider should return jvm-list.html', done => {
      let providerFn = args[1].templateProvider[1];
      providerFn.should.be.a.Function();
      providerFn(q);
      q.should.be.calledOnce();

      let deferred = q.args[0][0];
      deferred.should.be.a.Function();

      let resolve = sinon.stub().callsFake(val => {
        val.should.equal(require('./jvm-list.html'));
        done();
      });
      deferred(resolve);
    });

    it('resolve should load jvm-list module', done => {
      let resolveFn = args[1].resolve.loadJvmList[2];
      resolveFn.should.be.a.Function();
      resolveFn(q, ocLazyLoad);
      q.should.be.calledOnce();

      let deferred = q.args[0][0];
      deferred.should.be.a.Function();

      let resolve = sinon.stub().callsFake(val => {
        ocLazyLoad.load.should.be.calledWith({ name: 'jvmList' });
        val.should.equal(require('./jvm-list.module.js'));
        done();
      });
      deferred(resolve);
    });
  });

});
