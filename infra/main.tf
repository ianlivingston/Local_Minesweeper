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

locals {
  buc = "webprojects-website-d21d566a-0667-d8a8-0901-0d7297404c7a"
}

resource "aws_s3_object" "html" {
  bucket = local.buc
  key = "minesweeper.html"
  source = "../dist/minesweeper.html"
  content_type = "text/html"
}

resource "aws_s3_object" "css" {
  bucket = local.buc
  key = "minesweeper.css"
  source = "../dist/assets/app-BS5aiIN-.css"
  content_type = "text/css"
}

resource "aws_s3_object" "js" {
  bucket = local.buc
  key = "minesweeper.js"
  source = "../dist/assets/app-cm87zP-h.js"
  content_type = "text/javascript"
}