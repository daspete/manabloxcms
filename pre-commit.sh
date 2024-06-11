#!/bin/bash

cd ./packages/admin/
yarn format
yarn lint

cd ../../

cd ./packages/server
yarn format
yarn lint

cd ../../
