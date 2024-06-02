Description: To-Do app service which exposes API for View, Add, Delete for the App

Author: Nitin Arora
Github: https://github.com/Nitin304/
Repo Link: 
Video Recording Link: 
URL for Service Tier: http://35.247.86.209/todos
Docker hub Image: https://hub.docker.com/repository/docker/nitin304/nagpassignment/general
                  nitin304/nagpassignment:<TAG_NAME>

Description: To-Do app service which exposes API for View, Add, Delete for the App

Steps to Follow ->

1. Disk creation
   -- gcloud compute disks create postgres-disk --size=10GB --type=pd-standard --zone=us-west1-c
2. Create PV and PVC for the asked size
    -- kubectl apply -f postgres-pv-pvc.yaml
3. Create Postgres Stateful set
        a. This will create postgres password secret
        b. Create Headless service
        c. Postgres Stateful set with replica as 1
    -- kubectl apply -f postgres-statefulset.yaml
4. Docker Hub Reference
    -- Link--> https://hub.docker.com/repository/docker/nitin304/nagpassignment/general
    -- Image --> nitin304/nagpassignment:<TAG_NAME>
5. Create ConfigMap for the API Service.
    -- kubectl apply -f configMap.yaml
6. Create Deployment for the API Service which will also create below things
        a. Create Deployment for API Service(Rolling Update Strategy)
        b. Create a Load Balancer and exposes an external IP to access the API from outside the cluster
        c. Create Horizontal Pod Auto Scaler which will increase the no. of pods to 4 if the CPU utilization crosses a number.
    -- kubectl apply -f apiservice.yaml
7. Create the schema in DB, run migrations and run seed.
    -- kubectl exec <POD_NAME> --stdin --tty -- createdb -U sample todos
    -- kubectl exec <POD_NAME> knex migrate:latest
    -- kubectl exec <POD_NAME> knex seed:run


Demo Commands
Show all objects deployed and running
1. View Pods
    -- kubectl get pod
2. View Load Balancer and Postgres Headless Service
    -- kubectl get svc
3. View Stateful Set
    -- kubectl get sts
4. View Deployment for API Service
    -- kubectl get deploy
5. View Secrets for PostgreSQL
    -- kubectl get secret
6. View ConfigMap for API Service
    -- kubectl get configmap
Run API and retrieve records from db
1. View Record: http://35.247.86.209/todos -- GET
2. Add Record: http://35.247.86.209/todos -- POST
    Payload:{
                "title": "New Entry into TODO"
            }

Show that deleting db pods doesn’t delete data from db
1. -- kubectl delete pod <POD_NAME>

Show rolling update for API service pods
1. Apply apiService_1.yaml which uses a different image version:2 tag name
2. -- kubectl apply -f apiservice_1.yaml

Show Horizontal Pod Autoscaler in action
1. -- kubectl exec -it apiservice-7bf6bfc6db-75xlm -- node
2. Run function to get fibonaci series nth place number.
    function fibonacci(n){
        if(n<=2){
            return 1
        }
        else {
            return fibonacci(n-1) + fibonacci(n-2);
        }
    }
3. -- kubectl get po -w
    -- kubectl get hpa -w 