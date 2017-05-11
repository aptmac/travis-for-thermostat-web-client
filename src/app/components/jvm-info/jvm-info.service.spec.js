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

describe('JvmInfoService', () => {

  beforeEach(angular.mock.module($provide => {
    'ngInject';

    $provide.value('gatewayUrl', 'http://example.com:1234');
  }));

  beforeEach(angular.mock.module('jvmInfo.service'));

  let httpBackend, scope, svc;
  beforeEach(inject(($httpBackend, $rootScope, jvmInfoService) => {
    'ngInject';
    httpBackend = $httpBackend;

    scope = $rootScope;
    svc = jvmInfoService;
  }));

  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should exist', () => {
    should.exist(svc);
  });

  describe('getJvmInfo(jvmId)', () => {
    it('should resolve mock data', done => {
      let expected = {
        jvmId: 'foo-jvmId',
        mainClass: 'c.r.t.A',
        startTime: 45000,
        endTime: -1,
        isAlive: true,
        jvmOptions: []
      };
      httpBackend.when('GET', 'http://example.com:1234/jvm-info/foo-jvmId')
        .respond(expected);
      svc.getJvmInfo('foo-jvmId').then(res => {
        res.data.should.deepEqual(expected);
        done();
      });
      httpBackend.expectGET('http://example.com:1234/jvm-info/foo-jvmId');
      httpBackend.flush();
      scope.$apply();
    });
  });

});
