/*jslint indent: 2, nomen: true, maxlen: 100, white: true  plusplus: true */
/*global beforeEach, afterEach */
/*global describe, it, expect */
/*global window, eb, loadFixtures, document */
/*global $, _, d3*/
/*global helper*/
/*global EdgeShaper*/

////////////////////////////////////////////////////////////////////////////////
/// @brief Graph functionality
///
/// @file
///
/// DISCLAIMER
///
/// Copyright 2010-2012 triagens GmbH, Cologne, Germany
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
/// Copyright holder is triAGENS GmbH, Cologne, Germany
///
/// @author Michael Hackstein
/// @author Copyright 2011-2013, triAGENS GmbH, Cologne, Germany
////////////////////////////////////////////////////////////////////////////////

(function () {
  "use strict";

  describe('Monitored Collection', function() {
    
    beforeEach(function() {
      app = app || {};
    });
    
    it('should bind itself to the app scope', function() {
      expect(app.MonitoredCollection).toBeDefined();
    });
    
    it('should be able to fetch collections', function() {
      
      var collection;
      
      runs(function() {
        collection = new app.MonitoredCollection();
        collection.fetch();
      });
      
      waits(1000);
      
      runs(function() {
        expect(collection.findWhere({name: "String"})).toBeDefined();
        expect(collection.findWhere({name: "Number"})).toBeDefined();
      });
      
    });
    
  });
}());
