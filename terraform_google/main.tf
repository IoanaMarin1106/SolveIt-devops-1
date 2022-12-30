# google_client_config and kubernetes provider must be explicitly specified like the following.
data "google_client_config" "default" {}

module "gke" {
  source                     = "terraform-google-modules/kubernetes-engine/google"
  project_id                 = var.gcp_project_id
  name                       = var.gke_cluster_name
  region                     = var.gcp_region
  regional                   = var.gke_regional
  zones                      = var.gke_zones
  network                    = var.gke_network
  subnetwork                 = var.gke_subnetwork
  http_load_balancing        = false
  network_policy             = false
  horizontal_pod_autoscaling = true
  ip_range_pods = ""
  ip_range_services = ""

  node_pools = [
    {
      name                      = var.gke_nodepool_name
      machine_type              = "e2-medium"
      min_count                 = 3
      max_count                 = 3
      local_ssd_count           = 0
      spot                      = false
      disk_size_gb              = 10
      disk_type                 = "pd-standard"
      image_type                = "COS_CONTAINERD"
      enable_gcfs               = false
      enable_gvnic              = false
      auto_repair               = true
      auto_upgrade              = true
      service_account           = var.gke_service_account_name#"project-service-account@<PROJECT ID>.iam.gserviceaccount.com"
      preemptible               = true
      initial_node_count        = 3
    },
  ]

  node_pools_oauth_scopes = {
    all = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }

  node_pools_labels = {
    all = {}

    default-node-pool = {
      default-node-pool = true
    }
  }

  node_pools_metadata = {
    all = {}

    default-node-pool = {
      node-pool-metadata-custom-value = "my-node-pool"
    }
  }

  node_pools_taints = {
    all = []

    default-node-pool = [
      {
        key    = "default-node-pool"
        value  = true
        effect = "PREFER_NO_SCHEDULE"
      },
    ]
  }

  node_pools_tags = {
    all = []

    default-node-pool = [
      "default-node-pool",
    ]
  }
}