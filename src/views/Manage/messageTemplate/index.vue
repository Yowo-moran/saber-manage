<script setup lang="ts">
import { getTemplate, createTemplate, delTemplate, editTemplate, searchTemplate, getManage } from "@/api/messageTemplate";
onMounted(() => {
  getList()
  getOptions()
});

const getList = async () => {
  const data: any = await getTemplate(currentPage.value, pageSize.value);
  if (data?.result_code === "success") {
    tableData.splice(0, tableData.length, ...data.data.resultList);
    allPage.value = data.data.total;
  }
}
const getOptions = async () => {
  const data: any = await getManage(currentPage.value, pageSize.value);
  if (data?.result_code === "success") {
    options.splice(0, options.length, ...data.data.resultList);
  }
}

const templateSearch = ref("");
const selectValue = ref("");
const options: any = reactive([]);
const search = async () => {
  const data: any = await searchTemplate(currentPage.value, pageSize.value, { createBy: selectValue.value, keyword: templateSearch.value })
  if (data?.result_code === "success") {
    tableData.splice(0, tableData.length, ...data.data.resultList);
    allPage.value = data.data.total;
  }
}

type tableData = {
  content: string;
  createBy: string;
  createTime: string;
  description: string;
  id: number;
  isDeleted: number;
  name: string;
  updateBy: string;
  updateTime: string;
  version: number;
}
const tableData: Array<tableData> = reactive([]);

const templateDialog = ref(false);
const templateDialogForm = reactive({
  name: "",
  description: "",
  content: ""
});
const reset = () => {
  templateDialogForm.name = ""
  templateDialogForm.description = ""
  templateDialogForm.content = ''
}

const addTemplate = async () => {
  const data = await createTemplate(templateDialogForm);
  if (data?.result_code === 'success') {
    getList()
    templateDialog.value = false;
  }
}

const edit = ref(false);
const editId = ref(0);
const templateEdit = async () => {
  const data = await editTemplate(editId.value, templateDialogForm);
  if (data?.result_code === 'success') {
    getList()
    templateDialog.value = false;
  }
}

const templateDel = async (index: number) => {
  const id: number = tableData[index].id;
  const data = await delTemplate(id);
  if (data?.result_code === 'success') {
    getList()
  }
}

const allPage = ref(0);
const currentPage = ref(1);
const pageSize = ref(15);
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getList();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getList();
};
</script>
<template>
  <div class="card">
    <div class="table-top">
      <div class="table-top-left">
        <el-input v-model="templateSearch" style="margin-right: 1.5%" size="large" placeholder="搜索模板名称" @change="() => {
          currentPage = 1;
          pageSize = 15;
          search()
        }">
          <template #prefix>
            <svg-icon iconName="icon-sousuo" className="svg" color="#757575"></svg-icon>
          </template>
        </el-input>
        <el-select v-model="selectValue" style="width: 38%" placeholder="选择创建人" size="large" @change="() => {
          currentPage = 1;
          pageSize = 15;
          search()
        }">
          <el-option v-for="item in options" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </div>
      <el-button type="primary" color="#4460EF" @click="() => {
        templateDialog = true;
        reset()
      }">
        <svg-icon iconName="icon-jiahao" className="svg" color="#ffffff"></svg-icon>
        <strong style="font-weight: 600; margin: 0 1em">新建</strong>
      </el-button>
    </div>
    <div class="table-main">
      <el-table :data="tableData" height="100%" style="width: 100%" border
        :header-cell-style="{ 'background-color': '#EDF1F7', color: 'black' }" stripe>
        <el-table-column prop="id" label="模板ID" width="100" align="center" />
        <el-table-column prop="name" label="模板名称" width="200" align="center" />
        <el-table-column prop="description" label="模板简介" width="200" align="center" />
        <el-table-column prop="content" label="模板内容" align="center" />
        <el-table-column prop="updateBy" label="创建人" width="120" align="center" />
        <el-table-column fixed="right" label="操作项" width="180" align="center">
          <template #default="scope">
            <el-button link style="margin-right: 20%; font-weight: 600" @click.prevent="templateDel(scope.$index)">
              <span style="font-weight: 600">删除</span>
            </el-button>
            <el-button color="#4460EF" plain link type="primary" style="font-weight: 600" @click.prevent="() => {
              edit = true;
              templateDialog = true;
              editId = tableData[scope.$index].id;
              const { name, description, content } = tableData[scope.$index];
              templateDialogForm.name = name;
              templateDialogForm.description = description;
              templateDialogForm.content = content;
            }
              ">
              <span style="font-weight: 600">查看</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-bottom">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[15, 25, 50]"
        :background="true" layout="total, sizes, prev, pager, next, jumper" :total="allPage"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
  <el-dialog v-model="templateDialog" width="70%" align-center>
    <el-form :model="templateDialogForm" label-width="120px">
      <el-form-item label="模板名称">
        <el-input v-model="templateDialogForm.name" maxlength="10" show-word-limit style="width: 35%"
          placeholder="输入模板名称（必填）" />
      </el-form-item>
      <el-form-item label="模板简介">
        <el-input v-model="templateDialogForm.description" maxlength="25" type="textarea" :rows="2" show-word-limit
          style="width: 60%" resize="none" placeholder="添加模板简介（必填）" />
      </el-form-item>
      <el-form-item label="内容">
        <strong style="color: #3857ee">备注:配置字段表示为{配置内容},将在发通知时自动匹配对应内容</strong>
        <el-input v-model="templateDialogForm.content" type="textarea" :rows="18" style="width: 95%" resize="none"
          placeholder="输入模板内容（必填）
示例：
    {name}你好!我们是{organization},诚挚邀请您参与我们的面试。面面试时间为:{time},面试地点:{location}
                " />
      </el-form-item>
      <div class="dialog-footer">
        <el-button @click="templateDialog = false" class="button">取消</el-button>
        <el-button type="primary" @click="addTemplate" class="button" color="#4460EF" v-show="!edit">
          创建
        </el-button>
        <el-button type="primary" @click="templateEdit" class="button" color="#4460EF" v-show="edit">
          修改
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<style lang="scss" scoped>
.table-top {
  width: 100%;
  height: 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .table-top-left {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;

    .el-input {
      width: 38%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    ::v-deep(.el-input__wrapper) {
      height: 3em;
    }
  }
}

.table-main {
  margin-top: 0.7%;
  width: 100%;
  height: 86%;

  .el-table {
    ::v-deep(.cell) {
      font-size: 15px;
    }

    ::v-deep(.el-table__header-wrapper) {
      height: 11%;
      border-radius: 10px 10px 0 0;
    }

    ::v-deep(.el-table__header) {
      height: 100%;

      .cell {
        font-weight: 700;
      }
    }
  }
}

.table-bottom {
  width: 100%;
  height: 7%;
  padding-right: 1%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ::v-deep(.el-pagination.is-background .el-pager li.is-active) {
    background-color: #4460ef;
  }
}

::v-deep(.el-form-item__label) {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
}

.button {
  width: 12%;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
}

.dialog-footer {
  width: 100%;
  padding: 0 3%;
  display: flex;
  justify-content: flex-end;
}
</style>
