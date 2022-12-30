variable "gcp_credentials" {
    type = string
    description = "Location of service account for GCP"
}

variable "gcp_project_id" {
    type = string
    description = "Project Name"
}

variable "gcp_region" {
    type = string
    description = "GCP Region"
}

variable "gke_cluster_name" {
    type = string
    description = "GKE Cluster Name"
}

variable "gke_zones" {
    type = list(string)
    description = "GKE Zones List for the GKE Cluster"
}

variable "gke_regional" {
    type = bool
    description = "Whether the GKE is regional or not"
}

variable "gke_network" {
    type = string
    description = "VPC Network Name"
}

variable "gke_subnetwork" {
    type = string
    
}

variable "gke_nodepool_name" {
    type = string
    description = "Nodepool Name"
}

variable "gke_service_account_name" {
    type = string
    description = "GKE Service Account Name"
}

