#
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
#
module Puppet::Parser::Functions
  newfunction(:hdp_nagios_target_hosts, :type => :rvalue) do |args|
    args = function_hdp_args_as_array(args)
    host_types = args[0]
#TODO: see if needed       Puppet::Parser::Functions.autoloader.loadall
    host_types.map{|t|function_hdp_host(t)}.map{|h|function_hdp_is_empty(h) ? [] : [h].flatten}.flatten
  end
end
