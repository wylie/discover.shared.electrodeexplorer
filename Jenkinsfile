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
  shared.basicECSDeploy("default")
  shared.basicECSDeploy("devqa")

}
