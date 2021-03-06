#!groovy
@Library("platform.infrastructure.jenkinslib")
import com.ebsco.platform.Shared

node("docker") {

  // Create a groovy library object from the Shared.groovy file.
  def shared = new com.ebsco.platform.Shared()

  // Ensure we start with an empty directory.
  deleteDir()

  // Checkout the repo from github
  stage ('checkout') {
    checkout scm
  }

  /*
   * Run npm build tasks -- npm install, test
   * Please ensure that npm test runs everything you need
   * Stages: Build/Test
   */
  shared.npmBuild()

  /*
   * Builds the docker file, updates tags, publishes the new container to ecr
   * Stages: Build/Publish Docker
   */
  shared.dockerPublishDev()

 /*
  *
  * Deploy to ECS
  * Bare bones ECS deployment
  * Stages: Deploy to ECS
  */
  def targetGroupArnDevqa = shared.setupLoadBalancer("devqa", "3000")

  def albNameDevqa = shared.setupALB("devqa",
      targetGroupArnDevqa,
       false,
       "Dmz",
       "eis-deliverydevqa.cloud.",
       false
    )

  shared.basicECSDeploy('devqa')

  shared.setApplicationLoadBalancerDNSAlias("devqa","discoversharedelectrodeexplore","electrodeexplorer.vpca.us-east-1","eis-deliverydevqa.cloud.")
  shared.setApplicationLoadBalancerDNSAlias("devqa","discoversharedelectrodeexplore","electrodeexplorer","vpca.us-east-1.eis-deliverydevqa.cloud.")

}
