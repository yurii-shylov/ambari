/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var App = require('app');

App.MainServiceInfoSummaryController = Em.Controller.extend({
  name: 'mainServiceInfoSummaryController',

  selectedFlumeAgent: null,

  /**
   * Send start command for selected Flume Agent
   * @method startFlumeAgent
   */
  startFlumeAgent: function () {
    var selectedFlumeAgent = this.get('selectedFlumeAgent');
    if (selectedFlumeAgent && selectedFlumeAgent.get('status') === 'INSTALLED') {
      var self = this;
      App.showConfirmationPopup(function () {
        var command = 'START';
        var context = Em.I18n.t('services.service.summary.flume.start.context').format(selectedFlumeAgent.get('name'));
        self.sendFlumeAgentCommandToServer(command, context, selectedFlumeAgent);
      });
    }
  },

  /**
   * Send stop command for selected Flume Agent
   * @method stopFlumeAgent
   */
  stopFlumeAgent: function () {
    var selectedFlumeAgent = this.get('selectedFlumeAgent');
    if (selectedFlumeAgent && selectedFlumeAgent.get('status') === 'RUNNING') {
      var self = this;
      App.showConfirmationPopup(function () {
        var command = 'STOP';
        var context = Em.I18n.t('services.service.summary.flume.stop.context').format(selectedFlumeAgent.get('name'));
        self.sendFlumeAgentCommandToServer(command, context, selectedFlumeAgent);
      });
    }
  },

  /**
   * Send command for Flume Agent to server
   * @param {string} command
   * @param {string} context
   * @param {Object} agent
   * @method sendFlumeAgentCommandToServer
   */
  sendFlumeAgentCommandToServer: function (command, context, agent) {
    App.ajax.send({
      name: 'service.flume.agent.command',
      sender: this,
      data: {
        command: command,
        context: context,
        agentName: agent.get('name'),
        host: agent.get('host.hostName')
      },
      success: 'commandSuccessCallback'
    });
  },

  /**
   * Callback, that shows Background operations popup if request was successful
   */
  commandSuccessCallback: function () {
    console.log('Send request for refresh configs successfully');
    // load data (if we need to show this background operations popup) from persist
    App.router.get('applicationController').dataLoading().done(function (showPopup) {
      if (showPopup) {
        App.router.get('backgroundOperationsController').showPopup();
      }
    });
  },

  nagiosUrl: function(){
    return App.router.get('clusterController.nagiosUrl');
  }.property('App.router.clusterController.nagiosUrl'),
  
  isNagiosInstalled: function(){
    return App.router.get('clusterController.isNagiosInstalled');
  }.property('App.router.clusterController.isNagiosInstalled'),

  isGangliaInstalled: function(){
    return App.router.get('clusterController.isGangliaInstalled');
  }.property('App.router.clusterController.isGangliaInstalled')
});