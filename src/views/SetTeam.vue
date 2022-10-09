<template>
  <el-container direction="vertical">
    <el-row>
      <el-col :span="24">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step
            v-for="(step, index) in steps"
            :key="index"
            :title="step.title"
            :icon="step.icon"
            :status="step.status"
          ></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-card shadow="always">
          <div v-if="active === 0">
            <el-form
              ref="profileForm"
              label-width="200px"
              show-message
              :model="useUserStore()"
            >
              <el-form-item label="Real Name" prop="realname">
                <el-input v-model="useUserStore().realname"></el-input>
              </el-form-item>
              <el-form-item label="Choose your role:" prop="isDeveloper">
                <el-radio-group v-model="useUserStore().isDeveloper">
                  <el-radio-button :label="true"
                    >WIKI Developer</el-radio-button
                  >
                  <el-radio-button :label="false">WIKI Editor</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="active === 1">
            <el-result
              :icon="hasGit ? 'success' : 'warning'"
              style="
                width: 50%;
                left: 50%;
                position: relative;
                transform: translateX(-50%);
              "
            >
              <template #sub-title>
                <p v-if="!hasGit">
                  To upload the codes to the GitLab sever, we need to download
                  git and install it. We didn't detect the git. Please click the
                  download button to go to the download page to download and
                  install git.
                </p>
                <div v-else>
                  <p>Git is installed on the computer.</p>
                  <p>version: {{ gitVersion }}</p>
                </div>
              </template>
              <template #extra>
                <div v-if="!hasGit">
                  <el-button
                    type="primary"
                    @click="openLink('https://git-scm.com/downloads')"
                    ><SvgIcon iconClass="out_link" />
                    Download
                  </el-button>
                  <el-button
                    @click="refresh"
                    type="primary"
                    :loading="refreshLoading"
                  >
                    <el-icon :class="{ 'is-loading': isloading }">
                      <RefreshRight />
                    </el-icon>
                    Refresh</el-button
                  >
                </div>
              </template>
            </el-result>
          </div>
          <div v-if="active === 2">
            <el-form
              ref="teamForm"
              label-width="200px"
              show-message
              :model="useCompetitionStore()"
            >
              <el-form-item
                label="Team Name"
                prop="teamName"
                :rules="{
                  required: true,
                  message: 'Please input team name',
                }"
              >
                <el-input v-model="useCompetitionStore().teamName"></el-input>
              </el-form-item>
              <el-form-item label="Year" prop="year">
                <el-date-picker
                  v-model="useCompetitionStore().year"
                  type="year"
                  format="YYYY"
                  value-format="YYYY"
                />
              </el-form-item>
            </el-form>
          </div>
          <div v-if="active === 3">
            <el-form
              ref="accessForm"
              label-width="200px"
              show-message
              :model="useGitLabStore()"
            >
              <el-form-item
                label="AccessToken"
                prop="accessTokens"
                :rules="{
                  required: true,
                  message: 'Please input accessToken',
                }"
              >
                <el-input v-model="useGitLabStore().accessTokens"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="active === 4"></div>
          <el-divider />
          <el-row justify="end">
            <el-button v-show="active >= 1" @click="last" type="default"
              >Last</el-button
            >
            <el-button @click="next" type="primary">Next</el-button>
            <el-button
              v-show="steps[active].canSkip && active < steps.length - 1"
              @click="skip"
              type="default"
              >Skip</el-button
            >
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Download,
  Edit,
  UserFilled,
  Connection,
  Box,
  RefreshRight,
} from "@element-plus/icons-vue";
import { useUserStore, useCompetitionStore, useGitLabStore } from "@/store";
import { openLink } from "@/utils/useIPC";
import { isGit, getGitVersion } from "@/utils/git";
import { ElMessage } from "element-plus";

const active = ref(0);
// const canNext = ref(false);
const hasGit = ref(false);
const refreshLoading = ref(false);
const profileForm = ref();
const teamForm = ref();
const accessForm = ref();
const gitVersion = ref("");

const steps = ref([
  {
    title: "Edit personal profile",
    icon: UserFilled,
    canSkip: false,
    status: computed(() => {
      return active.value > 0 ? "success" : "process";
    }),
  },
  {
    title: "Install Git",
    icon: Download,
    canSkip: false,
    status: computed(() => {
      if (active.value > 1 && hasGit.value) {
        return "success";
      } else if (active.value == 1) {
        return "process";
      } else {
        return "wait";
      }
    }),
  },
  {
    title: "Set Team",
    icon: Edit,
    canSkip: false,
    status: computed(() => {
      if (active.value > 2) {
        return "success";
      } else if (active.value == 2) {
        return "process";
      } else {
        return "wait";
      }
    }),
  },
  {
    title: "Set accessToken",
    icon: Connection,
    canSkip: false,
    status: computed(() => {
      if (active.value > 3) {
        return "success";
      } else if (active.value == 3) {
        return "process";
      } else {
        return "wait";
      }
    }),
  },
  {
    title: "Init the repository",
    icon: Box,
    canSkip: false,
    status: computed(() => {
      if (active.value > 4) {
        return "success";
      } else if (active.value == 4) {
        return "process";
      } else {
        return "wait";
      }
    }),
  },
]);

async function refresh() {
  refreshLoading.value = true;
  hasGit.value = await isGit();
  gitVersion.value = await getGitVersion();
  refreshLoading.value = false;
}

function last() {
  active.value = Math.max(active.value - 1, 0);
}

function next() {
  console.log(profileForm.value);
  if (active.value === 1) {
    if (hasGit.value) {
      active.value = Math.min(active.value + 1, steps.value.length - 1);
    } else {
      ElMessage({
        type: "warning",
        message: "Please install Git",
      });
    }
  } else if (active.value === 2) {
    teamForm.value.validate((valid) => {
      if (valid) {
        active.value = Math.min(active.value + 1, steps.value.length - 1);
      }
    });
  } else if (active.value === 3) {
    accessForm.value.validate((valid) => {
      if (valid) {
        active.value = Math.min(active.value + 1, steps.value.length - 1);
      }
    });
  } else {
    active.value = Math.min(active.value + 1, steps.value.length - 1);
  }
}

function skip() {
  active.value = Math.min(active.value + 1, steps.value.length - 1);
  console.log(active.value);
}

onMounted(async () => {
  hasGit.value = await isGit();
  gitVersion.value = await getGitVersion();
});
</script>
