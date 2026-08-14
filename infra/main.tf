terraform {
  required_version = "~> 1.15.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
  backend "s3" {
    bucket       = "webprojects-tfstate-62afcd61-b2c1-6a59-dce1-d7b7c605f88e"
    key          = "minesweeper"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  type        = string
  description = "Sole region used by AWS resources"
  default     = "us-east-1"
}