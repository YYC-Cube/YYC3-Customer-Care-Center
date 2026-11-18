/**
 * @file page.tsx
 * @description page component/module for YYC3 Customer Care Center
 * @module app.ai.smart-forms.page
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  FormInput,
  Brain,
  Zap,
  Settings,
  Eye,
  Play,
  BarChart3,
  CheckCircle,
  Plus,
  Edit,
  Copy,
  Upload,
  Mic,
  Camera,
  MapPin,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AISmartFormsPage() {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // 智能表单模板
  const formTemplates = [
    {
      id: '1',
      name: '销售日报表（NFC版）',
      description: 'NFC触发的智能销售日报，自动填充业绩数据',
      category: '销售管理',
      fields: 12,
      aiFeatures: ['语音输入', '数据自动填充', '智能分析'],
      usage: 156,
      completion: 94,
      status: 'active',
      color: 'emerald',
    },
    {
      id: '2',
      name: '客户孵化追踪表',
      description: '动态推进引擎驱动的客户跟进表单',
      category: '客户管理',
      fields: 18,
      aiFeatures: ['阶段智能判定', '自动推送', '预测分析'],
      usage: 89,
      completion: 87,
      status: 'active',
      color: 'blue',
    },
    {
      id: '3',
      name: '智能问卷调研',
      description: 'AI驱动的动态问卷，根据回答智能调整问题',
      category: '市场调研',
      fields: 25,
      aiFeatures: ['动态问题', '情感分析', '智能总结'],
      usage: 234,
      completion: 76,
      status: 'active',
      color: 'purple',
    },
    {
      id: '4',
      name: '员工绩效评估',
      description: '多维度智能评估表单，自动生成改进建议',
      category: '人力资源',
      fields: 32,
      aiFeatures: ['360度评估', '能力画像', '发展建议'],
      usage: 67,
      completion: 91,
      status: 'draft',
      color: 'orange',
    },
  ];

  // 表单字段类型
  const fieldTypes = [
    { type: 'text', label: '文本输入', icon: FormInput },
    { type: 'textarea', label: '多行文本', icon: FormInput },
    { type: 'select', label: '下拉选择', icon: FormInput },
    { type: 'radio', label: '单选按钮', icon: FormInput },
    { type: 'checkbox', label: '多选框', icon: FormInput },
    { type: 'date', label: '日期选择', icon: FormInput },
    { type: 'number', label: '数字输入', icon: FormInput },
    { type: 'voice', label: '语音输入', icon: Mic },
    { type: 'image', label: '图片上传', icon: Camera },
    { type: 'location', label: '位置定位', icon: MapPin },
  ];

  // AI功能配置
  const aiFeatures = [
    {
      id: 'auto-fill',
      name: '智能自动填充',
      description: '基于历史数据和上下文自动填充表单字段',
      enabled: true,
      color: 'emerald',
    },
    {
      id: 'voice-input',
      name: '语音转文字',
      description: '支持语音输入，AI自动转换为文字并分类',
      enabled: true,
      color: 'blue',
    },
    {
      id: 'smart-validation',
      name: '智能验证',
      description: 'AI驱动的数据验证，提供智能纠错建议',
      enabled: true,
      color: 'purple',
    },
    {
      id: 'predictive-text',
      name: '预测输入',
      description: '基于用户行为预测下一步输入内容',
      enabled: false,
      color: 'orange',
    },
    {
      id: 'sentiment-analysis',
      name: '情感分析',
      description: '分析文本情感倾向，提供情感洞察',
      enabled: true,
      color: 'rose',
    },
    {
      id: 'auto-summary',
      name: '智能总结',
      description: '自动生成表单内容摘要和关键信息提取',
      enabled: true,
      color: 'indigo',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
    case 'active':
      return 'bg-success-100 text-success-700';
    case 'draft':
      return 'bg-warning-100 text-warning-700';
    case 'archived':
      return 'bg-neutral-100 text-neutral-700';
    default:
      return 'bg-primary-100 text-primary-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
    case 'active':
      return '使用中';
    case 'draft':
      return '草稿';
    case 'archived':
      return '已归档';
    default:
      return '未知';
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'border-l-success-500 bg-success-50',
      blue: 'border-l-primary-500 bg-primary-50',
      purple: 'border-l-accent-500 bg-accent-50',
      orange: 'border-l-warning-500 bg-warning-50',
      rose: 'border-l-danger-500 bg-danger-50',
      indigo: 'border-l-primary-500 bg-primary-50',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-accent-50 via-primary-50 to-primary-50 min-h-screen">
      {/* 页面头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 flex items-center">
            <FormInput className="w-8 h-8 mr-3 text-accent-600" />
            AI智能表单
          </h1>
          <p className="text-neutral-600 mt-2">智能表单设计与数据收集分析系统</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-l-4 border-l-accent-500 transition-all duration-300 hover:scale-105 bg-transparent"
          >
            <Upload className="w-4 h-4 mr-2" />
            导入模板
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-accent-500 to-primary-600 hover:from-accent-600 hover:to-primary-700 text-white transition-all duration-300 hover:shadow-xl hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                创建表单
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建智能表单</DialogTitle>
                <DialogDescription>使用AI技术创建智能化的数据收集表单</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="form-name">表单名称</Label>
                  <Input id="form-name" placeholder="输入表单名称" />
                </div>
                <div>
                  <Label htmlFor="form-description">表单描述</Label>
                  <Textarea id="form-description" placeholder="描述表单用途和功能" />
                </div>
                <div>
                  <Label htmlFor="form-category">表单分类</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择表单分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">销售管理</SelectItem>
                      <SelectItem value="customer">客户管理</SelectItem>
                      <SelectItem value="hr">人力资源</SelectItem>
                      <SelectItem value="research">市场调研</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="bg-gradient-to-r from-accent-500 to-primary-600 hover:from-accent-600 hover:to-primary-700 text-white"
                  >
                    创建表单
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-accent-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">智能表单</CardTitle>
            <FormInput className="h-4 w-4 text-accent-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-700">24</div>
            <p className="text-xs text-neutral-600">本月新增 +6</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">数据收集</CardTitle>
            <BarChart3 className="h-4 w-4 text-success-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success-700">1,247</div>
            <p className="text-xs text-neutral-600">本月提交数</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">完成率</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-700">87.3%</div>
            <p className="text-xs text-neutral-600">平均完成率</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI准确率</CardTitle>
            <Brain className="h-4 w-4 text-warning-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning-700">96.8%</div>
            <p className="text-xs text-neutral-600">智能识别准确率</p>
          </CardContent>
        </Card>
      </div>

      {/* AI功能配置 */}
      <Card className="border-l-4 border-l-primary-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-primary-700">
            <Brain className="w-5 h-5 mr-2" />
            AI功能配置
          </CardTitle>
          <CardDescription>配置和管理智能表单的AI功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`border-l-4 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 ${getColorClasses(feature.color)}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-neutral-900">{feature.name}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{feature.description}</p>
                  </div>
                  <Switch checked={feature.enabled} />
                </div>
                <div className="flex justify-between items-center">
                  <Badge className={`${getColorClasses(feature.color)} border-0`}>
                    {feature.enabled ? '已启用' : '已禁用'}
                  </Badge>
                  <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 表单模板列表 */}
      <Card className="border-l-4 border-l-accent-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-accent-700">
            <Zap className="w-5 h-5 mr-2" />
            智能表单模板
          </CardTitle>
          <CardDescription>预设的智能表单模板，支持一键部署和自定义</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {formTemplates.map((template) => (
              <div
                key={template.id}
                className={`border-l-4 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 ${getColorClasses(template.color)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-neutral-900 text-lg">{template.name}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{template.description}</p>
                    <Badge variant="outline" className="mt-2">
                      {template.category}
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(template.status)}>{getStatusText(template.status)}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-neutral-900">{template.fields}</div>
                    <div className="text-xs text-neutral-600">字段数量</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-neutral-900">{template.usage}</div>
                    <div className="text-xs text-neutral-600">使用次数</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-neutral-900">{template.completion}%</div>
                    <div className="text-xs text-neutral-600">完成率</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-neutral-700 mb-2">AI功能</div>
                  <div className="flex flex-wrap gap-1">
                    {template.aiFeatures.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between space-x-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      预览
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      编辑
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      复制
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-accent-500 to-primary-600 hover:from-accent-600 hover:to-primary-700 text-white transition-all duration-300 hover:scale-105"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      部署
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 表单字段类型 */}
      <Card className="border-l-4 border-l-success-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-success-700">
            <Settings className="w-5 h-5 mr-2" />
            智能字段类型
          </CardTitle>
          <CardDescription>支持的智能表单字段类型和AI增强功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {fieldTypes.map((field, index) => (
              <div
                key={index}
                className="border-l-4 border-l-success-500 bg-success-50 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
              >
                <field.icon className="w-8 h-8 mx-auto mb-2 text-success-600" />
                <div className="text-sm font-medium text-neutral-900">{field.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
